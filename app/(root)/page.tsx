import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAllPlaidBankAccounts, getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
  const loggedInUser = await getLoggedInUser();
  if (!loggedInUser) redirect("/login");

  const banks = await getAllPlaidBankAccounts(loggedInUser.$id);

  return (
    <section className="no-scrollbar flex w-full h-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        <header className="flex flex-col gap-8">
          <HeaderBox title="Welcome" highlight={loggedInUser?.name || ""} subtext="Access & manage your account and transactions." />
          <TotalBalanceBox banks={banks} />
        </header>
      </div>
      <div className="flex w-fit h-full">
        <RightSidebar user={loggedInUser} banks={banks} />
      </div>
    </section>
  )
}

export default Home;