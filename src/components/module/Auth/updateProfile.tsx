/* eslint-disable react-hooks/static-components */
// components/UpdateProfileButton.tsx

"use client";

import { useState, useTransition } from "react";
import { updateMyProfile } from "@/services/auth/updateMyProfile"; // Import the Server Action

// --- Types (Re-used for clarity) ---
type UserRole = "ADMIN" | "CHIEF_ENGINEER" | "SITE_ENGINEER" | "WORKER";

interface ProfileData {
  id: string;
  role: UserRole;
  contactNumber: string | null;
  nidNumber: string | null;
  profilePhoto: string | null;
  dailyRate: number | number | null; // Allow number or null
  companyName: string | null;
  position: string | null;
  email: string;
  name: string; // Added name for header clarity
}

interface UpdateProfileButtonProps {
  userData: ProfileData;
}

const UpdateProfileButton: React.FC<UpdateProfileButtonProps> = ({
  userData,
}) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const isWorker = userData.role === "WORKER";
  const isEngineerOrAdmin = userData.role !== "WORKER";
  // const roleTitle = userData.role.replace('_', ' ');

  const handleSubmit = async (formData: FormData) => {
    setMessage("");
    setIsSuccess(false);

    startTransition(async () => {
      const result = await updateMyProfile(formData);

      if (result.success) {
        setMessage(result.message);
        setIsSuccess(true);
        // Optional: To refresh the page data after update:
        // router.refresh();
      } else {
        setMessage(
          result.message || "Profile update failed due to a server error."
        );
        setIsSuccess(false);
      }
    });
  };

  // Helper component for form inputs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const InputField = ({
    label,
    name,
    defaultValue,
    type = "text",
    disabled = false,
    placeholder = "",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: any) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-semibold mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? ""}
        disabled={disabled}
        placeholder={placeholder}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ${
          disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
        }`}
      />
    </div>
  );

  const RoleSpecificFields = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Common Editable Fields */}
        <InputField
          label="Contact Number"
          name="contactNumber"
          defaultValue={userData.contactNumber}
          placeholder="e.g., 01XXXXXXXXX"
        />
      </div>

      {/* Profile Photo URL */}
      <InputField
        label="Profile Photo URL"
        name="profilePhoto"
        type="url"
        defaultValue={userData.profilePhoto}
        placeholder="Enter image URL (e.g., https://example.com/photo.jpg)"
      />

      {/* Role-Specific Fields Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4 mt-2 border-gray-100">
        {/* Worker Specific Fields */}
        {isWorker && (
          <>
            <InputField
              label="Daily Rate (৳)"
              name="dailyRate"
              type="number"
              defaultValue={userData.dailyRate}
              placeholder="e.g., 800"
            />
            <InputField
              label="NID Number"
              name="nidNumber"
              defaultValue={userData.nidNumber}
              placeholder="NID/Passport Number"
            />
            <InputField
              label="Position Title"
              name="position"
              defaultValue={userData.position}
              placeholder="e.g., Site Manager"
            />
          </>
        )}

        {/* Engineer/Admin Specific Fields */}
        {isEngineerOrAdmin && (
          <>
            <InputField
              label="Company Name"
              name="companyName"
              defaultValue={userData.companyName}
              placeholder="e.g., Alpha Construction"
            />
          </>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Button placed on the top right */}
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-150"
      >
        Update Profile
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 transform transition-all duration-300 scale-100 opacity-100">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h3 className="text-2xl font-bold text-gray-900">
                Update {userData.name} Profile
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-900 text-3xl font-light leading-none"
              >
                &times;
              </button>
            </div>

            <form action={handleSubmit}>
              {/* Hidden ID field for backend reference */}
              <input type="hidden" name="id" value={userData.id} />

              {/* Unchangeable Data Header */}
              <div className="bg-gray-50 p-3 mb-4 rounded-lg border border-gray-200">
                <h4 className="text-md font-semibold mb-2 text-gray-700">
                  Account Details (Cannot Be Changed)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                  {/* <InputField label="Role" defaultValue={userData.r} disabled={true} /> */}
                  <InputField
                    label="Email"
                    defaultValue={userData.email}
                    disabled={true}
                  />
                </div>
              </div>

              {/* Name is editable but common */}
              <InputField
                label="Full Name"
                name="name"
                defaultValue={userData.name}
              />

              {/* Editable Fields based on Role */}
              <h4 className="text-md font-semibold mb-2 mt-4 text-gray-700 border-t pt-4">
                Editable Profile Information
              </h4>
              {RoleSpecificFields()}

              {/* Message Display */}
              {message && (
                <p
                  className={`mb-4 p-3 rounded text-sm font-semibold transition duration-300 ${
                    isSuccess
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-red-100 text-red-700 border border-red-300"
                  }`}
                >
                  {message}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4 border-t mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className={`py-2 px-4 rounded font-bold text-white transition duration-150 shadow-md ${
                    isPending
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfileButton;
