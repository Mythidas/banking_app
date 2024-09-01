import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedInUser = await getLoggedInUser();
  if (!loggedInUser) redirect("/sign-in");

  return (
    <main className="flex h-screen w-full font-inter">
      {loggedInUser && <Sidebar user={loggedInUser} />}
      <div className="flex size-full flex-col">
        <div className="flex lg:hidden">
          <MobileNav user={loggedInUser} />
        </div>
        {children}
      </div>
    </main>
  );
}