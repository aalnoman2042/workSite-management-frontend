/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/site-engineer/create/page.tsx (or wherever your page is located)

"use client";

import React, { useState, FormEvent, useEffect } from 'react';
import { toast } from 'sonner';

// --- InputField Helper Component ---
const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  error,
  required = true
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
// --- End InputField Helper ---


const SiteEngineerCreatePage = () => {
    // 1. State for pending status and errors
    const [isPending, setIsPending] = useState(false);
    const [errors, setErrors] = useState<any[] | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    
    // Helper to get specific field error
    const getFieldError = (fieldName: string) => {
        if (errors) {
            return errors.find((err: any) => err.field === fieldName)?.message;
        }
        return null;
    };

    // 2. Handle form submission (API Call)
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsPending(true);
        setErrors(null);
        setSuccessMessage(null);

        const formData = new FormData(event.currentTarget);
        
        const payload = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            contactNumber: formData.get('contactNumber'),
            // Profile photo is optional
            profilePhoto: formData.get('profilePhoto') || null, 
        };

        try {
            // ** HYPOTHETICAL API CALL TO YOUR NEXT.JS ROUTE HANDLER **
            // You must create a Route Handler at /api/engineer/route.ts
            // or use the path to your external backend (e.g., http://localhost:5000/api/v1/engineer)
            const response = await fetch('http://localhost:5000/api/v1/user/register-site-engineer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                // Handle Validation Errors (if your API returns an 'errors' array)
                if (result.errors) {
                    setErrors(result.errors);
                    toast.error("Please correct the errors in the form.");
                } else {
                    // Handle General API/Service Errors (e.g., "User already exists")
                    toast.error(result.message || "Failed to create Site Engineer.");
                }
                return;
            }

            // Success
            setSuccessMessage("Site Engineer account created successfully! Awaiting approval.");
            toast.success("Engineer created successfully!");
            // Optionally clear the form
            event.currentTarget.reset(); 
            
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("An unexpected error occurred. Check console.");
        } finally {
            setIsPending(false);
        }
    };
    
    // 3. Render the UI
    return (
        <div className="flex min-h-screen items-start justify-center p-6 bg-gray-50">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 space-y-8 mt-10">
                
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Create New Site Engineer
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Enter required details to create a new Site Engineer account.
                    </p>
                </div>
                
                {/* Success Message Display */}
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        {successMessage}
                    </div>
                )}

                {/* The Functional Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Name */}
                        <InputField id="name" label="Full Name" placeholder="Jane Smith" error={getFieldError("name")} />

                        {/* Email */}
                        <InputField id="email" label="Email" type="email" placeholder="engineer@site.com" error={getFieldError("email")} />

                        {/* Contact Number */}
                        <InputField id="contactNumber" label="Contact Number" placeholder="01xxxxxxxxx" error={getFieldError("contactNumber")} />

                        {/* Profile Photo (Optional URL) */}
                        <InputField id="profilePhoto" label="Profile Photo URL" placeholder="https://example.com/photo.jpg" error={getFieldError("profilePhoto")} required={false} />

                        {/* Password */}
                        <InputField id="password" label="Temporary Password" type="password" placeholder="Set initial password (min 6 chars)" error={getFieldError("password")} />
                    </div>
                    
                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-black text-white py-3 rounded-lg font-medium text-base hover:bg-neutral-800 transition-all duration-200 disabled:bg-neutral-400 disabled:cursor-not-allowed shadow-md"
                        >
                            {isPending ? "Creating Engineer..." : "Create Site Engineer"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default SiteEngineerCreatePage;