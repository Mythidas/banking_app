import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import LinkPlaid from "@/components/LinkPlaid";
import { Progress } from "@/components/ui/progress";
import { getAllPlaidBankAccounts, getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";

const MyBanks = async () => {
  const loggedInUser = await getLoggedInUser();

  if (!loggedInUser) {
    redirect("/login");
  }

  const banks = await getAllPlaidBankAccounts(loggedInUser.$id);

  return (
    <section className="no-scrollbar flex w-full h-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-14 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        <header className="flex flex-col gap-8">
          <HeaderBox title="My Bank Accounts" highlight="" subtext="Effortlessly Manage Your Banking Activities" />
        </header>

        <div className="flex flex-col gap-6 size-full">
          <div className="flex w-full justify-between">
            <h1 className="font-semibold">
              Your Cards
            </h1>
            <LinkPlaid user={loggedInUser} />
          </div>
          <div className="flex flex-col pb-10 w-fit md:flex-row md:flex-wrap gap-10">
            {banks.map((bank) => {
              return bank.accounts.map((account) => {
                return (
                  <BankCard account={account} institution={bank.institution_name} user={loggedInUser} showBalance />
                )
              })
            })}
          </div>
          {!banks.length && (
            <div className="flex-center w-full h-3/5">
              <h1 className="text-4xl text-gray-400">
                No Accounts Linked
              </h1>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default MyBanks;