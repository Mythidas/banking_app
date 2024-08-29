import SignInForm from "@/components/SignInForm";
import Link from "next/link";
import Image from "next/image";
import React from 'react'

const SignIn = () => {
  return (
    <section className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
      <SignInForm />
    </section>
  )
}

export default SignIn;