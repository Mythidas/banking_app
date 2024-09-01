"use client";

import { signOut } from "@/lib/actions/user.actions";
import Image from "next/image";
import React from "react";

const SidebarFooter = ({ user }: { user: User }) => {
  const handleLogout = async () => {
    await signOut();
  }

  return (
    <footer className="flex justify-start lg:justify-between gap-3 pt-4 p-2 mt-auto border-t-[1px] border-gray-200">
      <div>
        <div className="flex-center size-9 rounded-full bg-gray-100">
          <span className="text-2xl text-blue-700 font-bold">
            {user.name[0]}
          </span>
        </div>
      </div>

      <div>
        <h1 className="text-sm">
          {user.name}
        </h1>
        <p className=" text-xs text-gray-600">
          {user.email}
        </p>
      </div>

      <div className="mt-auto">
        <button onClick={handleLogout}>
          <Image src="/icons/logout.svg" alt="logout" width={18} height={18} />
        </button>
      </div>
    </footer>
  )
}

export default SidebarFooter;