import React from 'react'
import DoughnutChart from "./DoughnutChart";
import AnimatedCounter from "./AnimatedCounter";
import Image from "next/image";
import Link from "next/link";

interface TotalBalanceBoxProps {
  accounts: Account[];
}

const TotalBalanceBox = ({ accounts }: TotalBalanceBoxProps) => {
  const amount = accounts.reduce((acc, account) => acc + account.currentBalance, 0);

  return (
    <div className="flex w-full h-fit p-6 gap-6 rounded-md border-[1px] shadow-sm border-gray-200">
      <div className="w-32 h-32">
        <DoughnutChart accounts={accounts} />
      </div>
      <div className="flex flex-col justify-between">
        <p className="font-semibold">
          {accounts.length} Bank Accounts
        </p>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm text-gray-600">
            Total Current Balance
          </h1>
          <div className="text-3xl font-bold">
            <AnimatedCounter amount={amount} />
          </div>
        </div>
      </div>
      <Link href="/" className="flex h-fit gap-2 ml-auto text-blue-600">
        <span className="text-2xl leading-[1.35rem]">
          +
        </span>
        <span>Add Bank</span>
      </Link>
    </div>
  )
}

export default TotalBalanceBox;