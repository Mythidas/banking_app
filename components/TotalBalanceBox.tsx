import React from 'react'
import DoughnutChart from "./DoughnutChart";
import AnimatedCounter from "./AnimatedCounter";
import Image from "next/image";
import Link from "next/link";

interface TotalBalanceBoxProps {
  banks: PlaidBank[];
}

const TotalBalanceBox = ({ banks }: TotalBalanceBoxProps) => {
  const amount = banks.reduce((acc, account) => acc + account.accounts.reduce((acc, account) => acc + account.balances.available, 0), 0);

  return (
    <div className="flex w-full h-fit p-6 gap-6 rounded-md border-[1px] shadow-sm border-gray-200">
      <div className="w-32 h-32">
        <DoughnutChart accounts={banks} />
      </div>
      <div className="flex flex-col justify-between">
        <p className="font-semibold">
          {banks.length} Bank Accounts
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
      <Link href="/my-banks" className="flex h-fit gap-2 ml-auto text-blue-600">
        <span className="text-2xl leading-[1.35rem]">
          +
        </span>
        <span>Add Bank</span>
      </Link>
    </div>
  )
}

export default TotalBalanceBox;