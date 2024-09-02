import React from 'react'
import SignUpForm from "@/components/SignUpForm";

const SignUp = async () => {
  return (
    <section className="flex min-h-screen w-full max-w-[420px] justify-center py-10">
      <SignUpForm />
    </section>
  )
}

export default SignUp;