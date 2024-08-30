import Link from "next/link";
import React from 'react'

const AuthFormFooter = ({ description, label, href }: { description: string, label: string, href: string }) => {
  return (
    <section className="flex-center gap-2">
      <p className="text-gray-500">
        {description}
      </p>
      <Link href={href} className="text-blue-500 hover:underline">
        {label}
      </Link>
    </section>
  )
}

export default AuthFormFooter;