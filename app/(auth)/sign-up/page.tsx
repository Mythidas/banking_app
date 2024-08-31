import React from 'react'
import SignUpForm from "@/components/SignUpForm";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const SignUp = async () => {
  const loggedInUser = await getLoggedInUser();
  console.log(loggedInUser);

  return (
    <section className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
      <SignUpForm />
    </section>
  )
}

export default SignUp;