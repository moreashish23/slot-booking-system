"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { CalendarClock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { loginSchema, LoginFormValues } from "@/lib/validationSchemas";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { getErrorMessage } from "@/utils/apiError";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginFormValues) {
    setIsSubmitting(true);
    try {
      await login(values.email, values.password);
      toast.success("Welcome back");
      router.push("/slots");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-900 text-signal-500">
            <CalendarClock className="h-5 w-5" aria-hidden />
          </div>
          <h1 className="text-xl font-semibold text-ink-900">Log in to Slotline</h1>
          <p className="text-sm text-ink-400">Book your next slot in seconds</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-card"
        >
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />
          <Button type="submit" isLoading={isSubmitting} className="mt-2 w-full">
            Log in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-ink-900 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
