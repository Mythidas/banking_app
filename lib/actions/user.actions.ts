"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { plaidClient } from "@/lib/plaid";
import { CountryCode, Products } from "plaid";
import { parseStringify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const {
  APPWRITE_DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID
} = process.env;

// ================== AUTH ====================

export async function signIn({ email, password }: { email: string; password: string }) {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(session);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function signUp({ password, ...userData }: SignUpParams) {
  const { email, firstName, lastName } = userData;

  let newUserAccount;

  try {
    const { account } = await createAdminClient();

    newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);

    if (!newUserAccount) throw new Error("Failed to create user account");

    const newUser = await createUserDocument(newUserAccount.$id, { password, ...userData });
    if (!newUser) {
      await account.deleteIdentity(newUserAccount.$id);
      throw new Error("Failed to create user document");
    }

    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw new Error("Failed to create session");

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function signOut() {
  try {
    cookies().delete("appwrite-session");
    redirect("/sign-in");

  } catch (error) {
    console.error(error);
  }
}

export async function getLoggedInUser(): Promise<User | null> {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    return parseStringify(result);
  } catch (error) {
    console.error(error);
    return null;
  }
}

// ================== DATABASE ====================

export async function createUserDocument(userId: string, { password, ...userData }: SignUpParams) {
  try {
    const { database } = await createAdminClient();
    const userDocument = await database.createDocument(APPWRITE_DATABASE_ID!, APPWRITE_USER_COLLECTION_ID!, ID.unique(), { userId, ...userData });

    return parseStringify(userDocument);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createBankAccountDocument({ userId, bankId, accessToken }: { userId: string; bankId: string; accessToken: string }) {
  try {
    const { database } = await createAdminClient();
    const bankAccount = await database.createDocument(APPWRITE_DATABASE_ID!, APPWRITE_BANK_COLLECTION_ID!, ID.unique(), { userId, bankId, accessToken });

    return parseStringify(bankAccount);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getBankAccountDocuments(userId: string) {
  try {
    const { database } = await createAdminClient();
    const bankAccounts = await database.listDocuments(APPWRITE_DATABASE_ID!, APPWRITE_BANK_COLLECTION_ID!, [Query.equal("userId", userId)]);

    return parseStringify(bankAccounts.documents);
  } catch (error) {
    console.error(error);
    return null;
  }
}

// ================== PLAID ====================

export async function createPlaidLinkToken(user: User) {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: user.name,
      products: ["auth"] as Products[],
      country_codes: ["US"] as CountryCode[],
      language: "en",
    }

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function exchangePlaidPublicToken({ public_token, user }: { public_token: string; user: User }): Promise<boolean> {
  try {
    const response = await plaidClient.itemPublicTokenExchange({ public_token });
    const { access_token, item_id } = response.data;

    console.log(user);
    await createBankAccountDocument({
      userId: user.$id,
      bankId: item_id,
      accessToken: access_token
    });

    revalidatePath("/");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getPlaidBankAccounts(bank: BankDocument): Promise<PlaidBank | null> {
  try {
    const response = await plaidClient.accountsGet({ access_token: bank.accessToken });

    return parseStringify(response.data);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getPlaidInstitutionById(bankId: string) {
  try {
    const response = await plaidClient.institutionsGetById({ institution_id: bankId, country_codes: ["US"] as CountryCode[] });

    return parseStringify(response.data);
  } catch (error) {
    console.error(error);
    return null;
  }
}

// ================== UTILS ====================

// getAllPlaidBankAccounts(userId: string) gets all the bank documents for a user and loops through them to get the Plaid accounts for each bank.
export async function getAllPlaidBankAccounts(userId: string): Promise<PlaidBank[]> {
  try {
    const bankAccounts = await getBankAccountDocuments(userId);
    if (!bankAccounts) return [];

    const plaidAccounts: PlaidBank[] = [];

    for (const bankAccount of bankAccounts) {
      const plaidAccount = await getPlaidBankAccounts(bankAccount);

      if (plaidAccount) {
        const bankInstitution = plaidAccounts.find((account) => account.item.institution_id === plaidAccount.item.institution_id);
        if (bankInstitution) {
          bankInstitution.accounts.push(...plaidAccount.accounts);
          continue;
        }

        const institution = await getPlaidInstitutionById(plaidAccount.item.institution_id);
        if (!institution) {
          console.error("Failed to get institution");
          continue;
        }

        plaidAccounts.push({ ...plaidAccount, institution_name: institution?.institution.name });
      }
    }

    return plaidAccounts;
  } catch (error) {
    console.error(error);
    return [];
  }
}