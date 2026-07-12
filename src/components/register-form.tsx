/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerWorker } from "@/services/auth/registerWorker";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

// Built on the shared Input/Label primitives instead of hardcoded gray-300 borders, so the
// form follows the theme rather than assuming a white page.
const Field = ({
  id,
  label,
  type = "text",
  placeholder,
  error,
  required = true,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string | null;
  required?: boolean;
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>
      {label}
      {required && <span className="ml-0.5 text-destructive">*</span>}
    </Label>
    <Input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      required={required}
      aria-invalid={!!error}
    />
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerWorker, null);

  const getFieldError = (fieldName: string) => {
    if (state?.errors) {
      return state.errors.find((err: any) => err.field === fieldName)?.message;
    }
    return null;
  };

  useEffect(() => {
    if (state && !state?.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field id="name" label="Full name" placeholder="John Doe" error={getFieldError("name")} />
        <Field
          id="nidNumber"
          label="NID number"
          placeholder="5656713216"
          error={getFieldError("nidNumber")}
        />
        <Field
          id="email"
          label="Email"
          type="email"
          placeholder="you@company.com"
          error={getFieldError("email")}
        />
        <Field
          id="contactNumber"
          label="Contact number"
          placeholder="017xxxxxxxx"
          error={getFieldError("contactNumber")}
        />
        <div className="md:col-span-2">
          <Field
            id="profilePhoto"
            label="Profile photo URL"
            type="url"
            placeholder="https://example.com/photo.jpg"
            error={getFieldError("profilePhoto")}
            required={false}
          />
        </div>
        <Field
          id="password"
          label="Password"
          type="password"
          placeholder="Min 6 characters"
          error={getFieldError("password")}
        />
        <Field
          id="confirmPassword"
          label="Confirm password"
          type="password"
          placeholder="Re-enter password"
          error={getFieldError("confirmPassword")}
        />
      </div>

      <div className="space-y-4">
        <Button type="submit" disabled={isPending} className="h-11 w-full">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Creating account..." : "Create account"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-foreground underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;