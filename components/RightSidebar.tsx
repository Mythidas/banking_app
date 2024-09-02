"use client";

import Image from "next/image";
import Link from "next/link";
import React from 'react'
import BankCard from "./BankCard";
import { cn } from "@/lib/utils";

interface RightSidebarProps {
  user: User;
  banks: PlaidBank[];
}

const RightSidebar = ({ user, banks }: RightSidebarProps) => {
  return (
    <aside className="xl:flex flex-col hidden w-[375px] h-full border-l-[1px] border-gray-200">
      <section className="flex flex-col">
        <Image src="/icons/gradient-mesh.svg" alt="home" width={500} height={500} />
        <div className="relative px-6">
          <div className="absolute flex-center -top-8 size-24 rounded-full bg-gray-100 border-4 border-white p-2 shadow-profile">
            <span className="text-6xl text-blue-700 font-bold">
              {user.name[0]}
            </span>
          </div>
        </div>
        <div className="pt-20 p-6">
          <h1 className="text-2xl font-bold">
            {user.name}
          </h1>
          <p className="text-sm text-gray-600">
            {user.email}
          </p>
        </div>
      </section>
      <section className="px-6 py-2 border-b-[1px] border-gray-200">
        <div className="flex justify-between">
          <h2 className="font-semibold">
            My Banks
          </h2>
          <Link href="/my-banks" className="flex h-fit gap-2 ml-auto text-blue-600">
            <span className="text-2xl leading-4">
              +
            </span>
            <span className="text-sm">
              Add Bank
            </span>
          </Link>
        </div>
        <div className={cn("relative py-6", { "pb-14": banks[1] })}>
          <BankCard account={banks[0].accounts[0]} institution={banks[0].institution_name} user={user} />
          {banks[1] && (
            <div className="absolute top-14 left-6 -z-10">
              <BankCard account={banks[1].accounts[0]} institution={banks[1].institution_name} user={user} />
            </div>
          )}
        </div>
      </section>
    </aside>
  )
}

export default RightSidebar;