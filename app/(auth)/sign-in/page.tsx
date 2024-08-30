import React from "react";
import SignInForm from "@/components/SignInForm";

const SignIn = () => {
  return (
    <section className="flex flex-col w-full max-w-[420px] justify-center gap-5 py-10 md:gap-8">
      <SignInForm />
    </section>
  )
}

export default SignIn;