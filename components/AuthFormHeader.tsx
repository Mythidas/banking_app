import Image from "next/image";
import Link from "next/link";
import React from 'react';

const AuthFormHeader = ({ label, description }: { label: string, description: string }) => {
  return (
    <header className="flex flex-col gap-10">
      <Link href="/" className="flex gap-2">
        <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
        <p className="font-serif text-3xl font-bold">
          Horizon
        </p>
      </Link>
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold">
          {label}
        </h1>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </header>
  )
}

export default AuthFormHeader;