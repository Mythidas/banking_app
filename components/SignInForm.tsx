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
import { signIn } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must contain at least 8 characters!")
})

const SignInForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await signIn(values);
      if (response) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="flex w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
      <AuthFormHeader label="Log in" description="Welcome back! Please enter your details." />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CustomFormField control={form.control} name="email" label="Email" placeholder="Enter your email" />
          <CustomFormField control={form.control} name="password" label="Password" placeholder="Enter your password" />
          <Button type="submit" className="button-gradient rounded-md">
            Login
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