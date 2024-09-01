"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image";
import { appName, sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SidebarFooter from "./SidebarFooter";


const MobileNav = ({ user }: { user: User }) => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="flex w-full justify-between p-4 shadow-md">
        <div className="flex">
          <Image src="/icons/logo.svg" alt="menu" width={32} height={32} />
          <h1 className="text-3xl font-semibold font-serif text-gray-800">
            &nbsp;{appName}
          </h1>
        </div>
        <Image src="/icons/hamburger.svg" alt="menu" width={32} height={32} />
      </SheetTrigger>
      <SheetContent side={"left"} className="flex flex-col size-full bg-white">
        <SheetClose asChild className="pb-6">
          <Link href="/" className="flex gap-2">
            <Image src="/icons/logo.svg" alt="logo" width={32} height={32} />
            <h1 className="text-3xl font-semibold font-serif text-gray-800">
              {appName}
            </h1>
          </Link>
        </SheetClose>
        <div className="size-full">
          <SheetClose asChild>
            <nav className="flex flex-col size-full">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.route || pathname.startsWith(link.route);

                return (
                  <SheetClose asChild key={link.route}>
                    <Link key={link.label} href={link.route} className={cn("p-4 rounded-md", { "button-gradient": isActive, "text-white": isActive })}>
                      <div className={cn("flex gap-3 font-semibold", { "text-gray-800": !isActive })}>
                        <Image src={link.imgURL} alt={link.label} width={24} height={24} className={cn({ "brightness-[3] invert-0": isActive })} />
                        <p>{link.label}</p>
                      </div>
                    </Link>
                  </SheetClose>
                )
              })}
            </nav>
          </SheetClose>
        </div>

        <SidebarFooter user={user} />
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav;