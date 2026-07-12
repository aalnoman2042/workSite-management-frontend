/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/services/auth/loginUser";
import { Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  const getFieldError = (fieldName: string) => {
    return state?.errors?.find((err: any) => err.field === fieldName)?.message || null;
  };

  useEffect(() => {
    if (state && !state?.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    // Rebuilt on the shared Input/Button/Label primitives. The old markup hardcoded
    // border-gray-300 and bg-black, which is invisible on a dark background.
    <form action={formAction} className="space-y-5">
      {redirect && <input type="hidden" name="redirect" value={redirect} />}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            required
            className="pl-10"
          />
        </div>
        {getFieldError("email") && (
          <p className="text-xs text-destructive">{getFieldError("email")}</p>
        )}
      </div>

      <div className="space-y-2">
        {/* The old form linked to /forget-password, which 404s — there is no password-reset
            page in the app. Dropped rather than shipping a dead link. */}
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
            className="pl-10"
          />
        </div>
        {getFieldError("password") && (
          <p className="text-xs text-destructive">{getFieldError("password")}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="h-11 w-full">
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isPending ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-foreground underline-offset-4 hover:underline"
        >
          Create one
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;