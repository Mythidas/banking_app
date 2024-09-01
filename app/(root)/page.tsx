import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Home = async () => {
  const loggedInUser = await getLoggedInUser();

  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        <header className="flex flex-col gap-8">
          <HeaderBox title="Welcome" highlight={loggedInUser?.name || ""} subtext="Access & manage your account and transactions." />
          <TotalBalanceBox accounts={[{ name: "Bank1", currentBalance: 2000 }, { name: "Bank2", currentBalance: 1845 }, { name: "Bank3", currentBalance: 6800 }]} />
        </header>
      </div>
      <div className="lg:flex w-[300px] hidden">
        <RightSidebar user={loggedInUser} />
      </div>
    </section>
  )
}

export default Home;