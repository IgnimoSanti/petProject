"use client";

import React, { useState } from "react";
import { GithubButton, GoogleButton } from "../buttons";
import { Separator } from "@radix-ui/react-separator";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpFields, SignUpValidationSchema } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import Link from "next/link";
import { Route } from "@/../routes";
import { useSearchParams } from "next/navigation";
import { UseSignUp } from "@/hooks/mutations/use-sign-up";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<SignUpFields>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
    resolver: zodResolver(SignUpValidationSchema),
  });
  const { mutateAsync, reset, isIdle, isPending, isSuccess } = UseSignUp();
  const [error, setError] = useState<string>("");
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackUrl") ?? Route.MAIN;
  const onSubmit: SubmitHandler<SignUpFields> = async (data) => {
    await mutateAsync(data, {
      onSuccess: (res) => {
        if (res.success) {
          signIn("credentials", { email: data.email, password: data.password });
          toast.success(res.success);
        }
        if (res.error) {
          toast.error(res.error);
          reset();
          setError(res.error);
        }
      },
    });
  };
  return (
    <div className="flex w-full grow items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full min-w-[300px] rounded-2xl bg-light-primary p-5 dark:bg-dark-primary sm:h-fit sm:w-fit"
      >
        <h1 className="mb-5 text-center text-2xl font-bold">Sign up</h1>
        <div className="my-3">
          <div>
            <Input {...register("email")} placeholder="Email" />
            <span className="ml-5 text-xs text-red-500">
              {errors.name?.message}
            </span>
          </div>
          <div>
            <Input
              {...register("name")}
              placeholder="Name"
              autoComplete="name"
            />
            <span className="ml-5 text-xs text-red-500">
              {errors.email?.message}
            </span>
          </div>
        </div>
        <div>
          <Input {...register("password")} placeholder="Password" />
          <span className="ml-5 text-xs text-red-500">
            {errors.password?.message}
          </span>
        </div>
        <Button type="submit" className="w-full">
          {isIdle && "Create account"}
          {isPending && "Create your account"}
          {isSuccess && "Acount created successfully"}
        </Button>
        <Separator className="my-5" />
        <div className="space-y-2">
          <GoogleButton callbackUrl={callbackURL} />
          <GithubButton callbackUrl={callbackURL} />
        </div>
        <div className="mt-3 text-sm text-secondary">
          {"Have an account already? "}
          <Link href={Route.SIGN_IN} className="cursor-pointer text-blue-500">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
