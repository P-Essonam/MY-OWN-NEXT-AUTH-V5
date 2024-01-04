"use client"
import React, { useState, useTransition, } from 'react'
import { Cardwrapper } from '.'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginSchema } from '@/schemas'  
import { Button } from '@/components/ui'
import { FormError, FormSuccess } from '@/components/index'
import { login } from '@/actions/login'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export const LoginForm = () => {


    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
    const [error,setError] = useState<string | undefined>("")
    const [success,setSucces] = useState<string | undefined>("")
    const [pending,startTransition] = useTransition()
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already in use with different provider!"
    : "";


    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSucces("");
        console.log("je click")
        
        startTransition(() => {
          login(values, callbackUrl)
            .then((data) => {
              if (data?.error) {
                form.reset();
                setError(data.error);
              }
    
              if (data?.success) {
                form.reset();
                setSucces(data.success);
              }
    
              if (data?.twoFactor) {
                setShowTwoFactor(true);
              }
            })
            .catch(() => setError("Something went wrong"));
        });
      };

  return (
    <Cardwrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={pending}
                        placeholder="123456"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={pending}
                          placeholder="john.doe@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={pending}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">
                          Forgot password?
                        </Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </>
          )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            disabled={pending}
            type="submit"
            className="w-full"
          >
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </Cardwrapper>
  )
}

