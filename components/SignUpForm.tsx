"use client";

import React, { useState } from "react";
import AuthFormHeader from "./AuthFormHeader";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "./CustomFormField";
import AuthFormFooter from "./AuthFormFooter";
import { signUp } from "@/lib/actions/user.actions";

const formSchema = z.object({
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  address1: z.string().min(3).max(50),
  state: z.string().min(2).max(2),
  city: z.string().min(3).max(50),
  postalCode: z.string().min(4).max(6),
  dateOfBirth: z.string().min(3),
  ssn: z.string().min(9).max(9),
  email: z.string().email(),
  password: z.string().min(8, "Password must contain at least 8 characters!")
})

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address1: "",
      state: "",
      city: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      // Call the signUp function from user.actions.ts
      // Pass the values from the form
      const newUser = await signUp(values);
      setUser(newUser);
      console.log(newUser);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
      <AuthFormHeader label="Sign up" description="Please enter your details." />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-4">
            <CustomFormField control={form.control} name="firstName" label="First Name" placeholder="Ex: John" />
            <CustomFormField control={form.control} name="lastName" label="Last Name" placeholder="Ex: Doe" />
          </div>
          <CustomFormField control={form.control} name="address1" label="Address" placeholder="Enter your address" />
          <CustomFormField control={form.control} name="city" label="Ciry" placeholder="Ex: Dallas" />
          <div className="flex gap-4">
            <CustomFormField control={form.control} name="state" label="State" placeholder="Ex: TX" />
            <CustomFormField control={form.control} name="postalCode" label="Postal Code" placeholder="Ex: 11101" />
          </div>
          <div className="flex gap-4">
            <CustomFormField control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="YYYY-MM-DD" />
            <CustomFormField control={form.control} name="ssn" label="SSN" placeholder="Ex: 1234" />
          </div>
          <CustomFormField control={form.control} name="email" label="Email" placeholder="Enter your email" />
          <CustomFormField control={form.control} name="password" label="Password" placeholder="Enter your password" />
          <Button type="submit" className="button-gradient" disabled={isLoading}>
            Sign up
          </Button>
        </form>
      </Form>
      <AuthFormFooter description="Already have an account?" label="Sign In" href="/sign-in" />
    </section>
  )
}

export default SignUpForm;