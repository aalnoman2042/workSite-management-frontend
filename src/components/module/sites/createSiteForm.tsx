/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, FormEvent, useRef } from "react";
import { serverFetch } from "@/lib/server-fetch";
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

const CreateSitePage = () => {
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<any[] | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  const getFieldError = (fieldName: string) => {
    return errors?.find((err: any) => err.field === fieldName)?.message || null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setErrors(null);
    setSuccessMessage(null);

    const formData = new FormData(formRef.current!);

    const payload = {
      name: formData.get("name"),
      location: formData.get("location"),
      address: formData.get("address"),
      startDate: formData.get("startDate") ? new Date(formData.get("startDate") as string).toISOString() : null,
      endDate: formData.get("endDate") ? new Date(formData.get("endDate") as string).toISOString() : null,
      totalCost: formData.get("totalCost")
        ? Number(formData.get("totalCost"))
        : null,
    };
// console.log(payload);

    try {
      const response = await serverFetch.post("/site", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (result.errors) {
          setErrors(result.errors);
          toast.error("Please correct the highlighted errors.");
        } else {
          toast.error(result.message || "Failed to create Site.");
        }
        return;
      }

      toast.success("Site created successfully!");
      setSuccessMessage("Site created successfully!");

      // reset form
      formRef.current?.reset();
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center p-6 bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 space-y-8 mt-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Create New Site</h1>
          <p className="text-gray-500 mt-1">
            Enter required details to create a new construction site.
          </p>
        </div>

        {successMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            {successMessage}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              id="name"
              label="Site Name"
              placeholder="Bashundhara Block C Extension"
              error={getFieldError("name")}
            />

            <InputField
              id="location"
              label="Location"
              placeholder="Bashundhara, Dhaka"
              error={getFieldError("location")}
            />

            <InputField
              id="address"
              label="Address"
              placeholder="Plot 27, Road 5"
              error={getFieldError("address")}
            />

            <InputField
              id="startDate"
              label="Start Date"
              type="date"
              error={getFieldError("startDate")}
            />

            <InputField
              id="endDate"
              label="End Date"
              type="date"
              required={false}
              error={getFieldError("endDate")}
            />

            <InputField
              id="totalCost"
              label="Total Cost"
              type="number"
              placeholder="1800000"
              required={false}
              error={getFieldError("totalCost")}
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-black text-white py-3 rounded-lg font-medium text-base hover:bg-neutral-800 transition-all duration-200 disabled:bg-neutral-400 disabled:cursor-not-allowed shadow-md"
            >
              {isPending ? "Creating..." : "Create Site"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSitePage;
