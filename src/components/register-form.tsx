// components/RegisterForm.tsx (Updated with minimal UI)

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect } from "react";
import { registerWorker } from "@/services/auth/registerWorker";
import { toast } from "sonner";
import Link from "next/link"; // Use Next.js Link for better navigation

// Helper component for the styled input/label group
const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  error: string | null;
}) => (
  <div className="flex flex-col space-y-1">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      required
      className={`w-full border ${
        error ? "border-red-500 ring-red-500" : "border-gray-300 focus:border-black focus:ring-black"
      } rounded-lg px-3 py-2 outline-none text-sm transition-all duration-200 focus:ring-2`}
    />
    {error && (
      <p className="text-red-600 text-xs mt-1">
        {error}
      </p>
    )}
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
      
      {/* Input Fields Grid (2 columns on medium screens) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <InputField
          id="name"
          label="Full Name"
          placeholder="John Doe"
          error={getFieldError("name")}
        />

        <InputField
          id="nidNumber"
          label="NID Number"
          placeholder="5656713216"
          error={getFieldError("nidNumber")}
        />

        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="m@example.com"
          error={getFieldError("email")}
        />

        <InputField
          id="contactNumber"
          label="Contact Number"
          placeholder="017xxxxxxxx"
          error={getFieldError("contactNumber")}
        />
        <InputField
          id="profilePhoto"
          label="Profile Photo URL"
          placeholder="https://example.com/photo.jpg"
          error={getFieldError("profilePhoto")}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="******"
          error={getFieldError("password")}
        />

        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="******"
          error={getFieldError("confirmPassword")}
        />
        
      </div>

      {/* Submit Button and Footer Link */}
      <div className="space-y-4 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white py-3 rounded-lg font-medium text-base hover:bg-neutral-800 transition-all duration-200 disabled:bg-neutral-400 disabled:cursor-not-allowed shadow-md"
        >
          {isPending ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-black font-medium hover:underline transition-colors">
            Sign in
          </Link>
        </p>
      </div>
      
    </form>
  );
};

export default RegisterForm;