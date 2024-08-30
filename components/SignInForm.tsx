"use client";

import React from 'react'
import AuthFormHeader from "./AuthFormHeader";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "./CustomFormField";
import AuthFormFooter from "./AuthFormFooter";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must contain at least 8 characters!")
})

const SignInForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <section className="flex w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
      <AuthFormHeader label="Log in" description="Welcome back! Please enter your details." />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CustomFormField control={form.control} name="email" label="Email" placeholder="Enter your email" />
          <CustomFormField control={form.control} name="password" label="Password" placeholder="Enter your password" />
          <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-400">
            Submit
          </Button>
        </form>
      </Form>
      <AuthFormFooter description="Don't have an account?" label="Sign Up" href="/sign-up" />
      <hr />
      <div>
        Google Login
      </div>
    </section>
  )
}

export default SignInForm;