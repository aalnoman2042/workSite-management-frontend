// components/RegisterForm.tsx (Updated with all required and optional fields)

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect } from "react";
import { registerWorker } from "@/services/auth/registerWorker";
import { toast } from "sonner";
import Link from "next/link"; 

// Helper component for the styled input/label group
const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  error,
  required = true, // Added a default required prop
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  error: string | null;
  required?: boolean; // Prop to override required status
}) => (
  <div className="flex flex-col space-y-1">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      required={required} // Use the prop value
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

        {/* 1. Full Name (Required) */}
        <InputField id="name" label="Full Name" placeholder="John Doe" error={getFieldError("name")} />

        {/* 2. NID Number (Required) */}
        <InputField id="nidNumber" label="NID Number" type="text" placeholder="5656713216" error={getFieldError("nidNumber")} />

        {/* 3. Email (Required) */}
        <InputField id="email" label="Email" type="email" placeholder="m@example.com" error={getFieldError("email")} />

        {/* 4. Contact Number (Required) */}
        <InputField id="contactNumber" label="Contact Number" placeholder="017xxxxxxxx" error={getFieldError("contactNumber")} />

        {/* 5. Profile Photo URL (Optional) - Re-added this field */}
        <InputField 
            id="profilePhoto" 
            label="Profile Photo URL" 
            type="url" 
            placeholder="https://example.com/photo.jpg" 
            error={getFieldError("profilePhoto")} 
            required={false} // Set to optional
        />
        
        {/* Empty placeholder to align layout for optional field, or shift passwords */}
        {/* If you want the passwords to be on the same row, remove this placeholder */}
        <div className="hidden md:block"></div> 

        {/* 6. Password (Required) */}
        <InputField id="password" label="Password" type="password" placeholder="Min 6 characters" error={getFieldError("password")} />

        {/* 7. Confirm Password (Required) */}
        <InputField id="confirmPassword" label="Confirm Password" type="password" placeholder="Re-enter password" error={getFieldError("confirmPassword")} />
        
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