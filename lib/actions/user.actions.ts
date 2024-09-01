"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

    return JSON.parse(JSON.stringify(session));
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function signUp(userData: SignUpParams) {
  try {
    const { email, password, firstName, lastName, address1, city, state, postalCode, dateOfBirth, ssn } = userData;
    const { account } = await createAdminClient();

    const newUser = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);

    return signIn({ email, password });
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Create a signOut function that will clear the session cookie 'appwrite-session' and redirect the user to the sign-in page
export async function signOut() {
  try {
    cookies().delete("appwrite-session");
    redirect("/sign-in");

  } catch (error) {
    console.error(error);
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error(error);
    return null;
  }
}
