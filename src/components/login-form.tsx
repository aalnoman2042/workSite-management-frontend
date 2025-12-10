
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect } from "react";

import { loginUser } from "@/services/auth/loginUser";
import { toast } from "sonner";
import { IoIosMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";



const LoginForm = ({ redirect }: { redirect?: string }) => {
  // Initialize Server Action hook
  const [state, formAction, isPending] = useActionState(loginUser, null);

  const getFieldError = (fieldName: string) => {
    return (
      state?.errors?.find((err: any) => err.field === fieldName)?.message ||
      null
    );
  };

  // Handle action result (Error Toast)
  useEffect(() => {
    if (state && !state?.success && state.message) {
  
      toast.error(state.message);
    }
  
  }, [state]);

  return (
    // The form now uses the simpler space-y class names from the desired UI
    <form action={formAction} className="space-y-4 sm:space-y-5">
      {redirect && <input type="hidden" name="redirect" value={redirect} />}

      {/* Email Field - Custom UI Structure */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="email" className="text-sm font-medium">
E-mail
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-black transition-all">
          {/* Icon (Requires Material Icons font link) */}
              <IoIosMail className="mr-3.5" />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            // Retain key functional attributes
            required
            className="w-full outline-none text-sm sm:text-base"
          />
        </div>
        {/* Error message display */}
        {getFieldError("email") && (
          <p className="text-red-600 text-xs mt-1">
            {getFieldError("email")}
          </p>
        )}
      </div>

      {/* Password Field - Custom UI Structure */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-black transition-all">
          {/* Icon (Requires Material Icons font link) */}
<FaLock className="mr-3.5" />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            // Retain key functional attributes
            required
            className="w-full outline-none text-sm sm:text-base"
          />
        </div>
        {/* Error message display */}
        {getFieldError("password") && (
          <p className="text-red-600 text-xs mt-1">
            {getFieldError("password")}
          </p>
        )}
      </div>

      {/* Submit Button - Custom UI Structure */}
      <button
        type="submit"
        disabled={isPending} // Disable while pending
        className="w-full bg-black text-white py-3 rounded-lg font-medium text-base sm:text-lg hover:bg-neutral-800 transition-all duration-200 disabled:bg-neutral-400 disabled:cursor-not-allowed"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>

      {/* Links - Custom UI Structure */}
      <div className="text-center text-sm">
        <a href="/forget-password" className="text-gray-500 hover:text-black underline transition-colors">
          Forgot password?
        </a>
      </div>
      
      <p className="text-center text-gray-500 text-xs sm:text-sm mt-6 pt-2">
         <a href="/register" className="underline hover:text-black transition-colors">
            Create an account
         </a>
         &nbsp; | &nbsp; 
        Need access? Contact the admin.
      </p>
    </form>
  );
};

export default LoginForm;