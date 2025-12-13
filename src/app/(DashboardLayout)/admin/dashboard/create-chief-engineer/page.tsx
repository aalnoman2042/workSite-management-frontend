/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { serverFetch } from "@/lib/server-fetch";
import React, { useState, FormEvent, useRef } from "react";
import { toast } from "sonner";

// --- InputField Helper Component ---
const InputField = ({
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
  error: string | null;
  required?: boolean;
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
      required={required}
      className={`w-full border ${
        error
          ? "border-red-500 ring-red-500"
          : "border-gray-300 focus:border-black focus:ring-black"
      } rounded-lg px-3 py-2 outline-none text-sm transition-all duration-200 focus:ring-2`}
    />
    {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
  </div>
);
// --- End InputField ---


const ChiefEngineerCreatePage = () => {
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<any[] | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  // Get field-specific error
  const getFieldError = (fieldName: string) => {
    return errors?.find((err: any) => err.field === fieldName)?.message || null;
  };

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setErrors(null);
    setSuccessMessage(null);

    const formData = new FormData(formRef.current!);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      contactNumber: formData.get("contactNumber"),
      profilePhoto: formData.get("profilePhoto") || "",

    };



    try {
      const response = await serverFetch.post("/user/register-chief-engineer", {
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });

      // If response is not ok, still attempt to parse JSON (backend may return structured errors)
      let result: any = {};
      try {
        result = await response.json();
      } catch (e) {
        // non-json response
        console.error("Non-JSON response from API:", e);
      }

      if (!response.ok || !result.success) {
        if (result?.errors) {
          setErrors(result.errors);
          toast.error("Please correct the highlighted errors.");
        } else {
          toast.error(result?.message || "Failed to create Chief Engineer.");
        }
        setIsPending(false);
        return;
      }

      // Success
      toast.success("Chief Engineer created successfully!");
      setSuccessMessage("Chief Engineer account created successfully!");

      // SAFE RESET
      formRef.current?.reset();

    } catch (error) {
      console.error("Error:", error);
      toast.error("Unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center p-6 bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 space-y-8 mt-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Create New Chief Engineer
          </h1>
          <p className="text-gray-500 mt-1">
            Fill details to create a Chief Engineer account.
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            {successMessage}
          </div>
        )}

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              id="name"
              label="Full Name"
              placeholder="Md. Hasan"
              error={getFieldError("name")}
            />

            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="chief@company.com"
              error={getFieldError("email")}
            />

            <InputField
              id="contactNumber"
              label="Contact Number"
              placeholder="01xxxxxxxxx"
              error={getFieldError("contactNumber")}
            />
    
            

         

            <InputField
              id="password"
              label="Temporary Password"
              type="password"
              placeholder="Set initial password (min 6 chars)"
              error={getFieldError("password")}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-black text-white py-3 rounded-lg font-medium text-base hover:bg-neutral-800 transition-all duration-200 disabled:bg-neutral-400 disabled:cursor-not-allowed shadow-md"
            >
              {isPending ? "Creating Chief Engineer..." : "Create Chief Engineer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChiefEngineerCreatePage;
