import React from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "./ui/input";

interface ICustomFormField {
  control: any
  name: string,
  label: string,
  placeholder: string,
  description?: string
}

const CustomFormField = ({ control, name, label, placeholder, description }: ICustomFormField) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
          </FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} className="border-gray-300 rounded-md" type={name.includes("password") ? "password" : "text"} />
          </FormControl>
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField;