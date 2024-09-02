/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ================= User =======================

declare type SignUpParams = {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  password: string;
};

declare type LoginUser = {
  email: string;
  password: string;
};

declare type User = {
  $id: string;
  email: string;
  name: string;
};

// ================= Docments =======================

declare type DocumentGenerics = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: [];
  $databaseId: string;
  $collectionId: string;
};

declare type UserDocument = DocumentGenerics & {
  email: string;
  userId: string;
  name: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};

declare type BankDocument = DocumentGenerics & {
  bankId: string;
  accessToken: string;
  userId: string;
};

// ================= PLAID =======================

declare type PlaidAccount = {
  account_id: string;
  balances: {
    available: number;
    current: number;
    iso_currency_code: string;
    limit: number | null;
    unofficial_currency_code: string | null;
  };
  mask: string;
  name: string;
  official_name: string;
  persistent_account_id: string;
  subtype: string;
  type: string;
};

declare type PlaidBank = {
  accounts: PlaidAccount[];
  item: {
    available_products: string[];
    billed_products: string[];
    consent_expiration_time: null;
    error: null;
    institution_id: string;
    item_id: string;
    products: string[];
    update_type: string;
    webhook: string;
  };
  request_id: string;
  institution_name?: string;
};