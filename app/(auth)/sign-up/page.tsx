import React from 'react'
import SignUpForm from "@/components/SignUpForm";

const SignUp = () => {
  return (
    <section className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
      <SignUpForm />
    </section>
  )
}

export default SignUp;