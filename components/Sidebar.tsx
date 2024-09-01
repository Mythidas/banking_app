"use client";

import { appName, sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = async ({ user }: { user: User }) => {
  const pathname = usePathname();

  return (
    <nav className="md:flex flex-col h-full w-[290px] p-4 pt-6 border-r-[1px] border-gray-200 hidden">
      <header className="pb-6">
        <Link href="/" className="flex gap-2">
          <Image src="/icons/logo.svg" alt="logo" width={32} height={32} />
          <span className="text-3xl font-semibold font-serif text-gray-800">
            {appName}
          </span>
        </Link>
      </header>
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.route || pathname.startsWith(link.route);

        return (
          <Link key={link.label} href={link.route} className={cn("p-4 rounded-md", { "button-gradient": isActive, "text-white": isActive })}>
            <div className={cn("flex gap-3 font-semibold", { "text-gray-800": !isActive })}>
              <Image src={link.imgURL} alt={link.label} width={24} height={24} className={cn({ "brightness-[3] invert-0": isActive })} />
              <span>{link.label}</span>
            </div>
          </Link>
        )
      })}
      <div className="pt-4 pb-2 mt-auto border-t-[1px] border-gray-200">
        {user.name}
      </div>
    </nav>
  )
}

export default Sidebar;