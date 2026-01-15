// services/auth/updateMyProfile.ts

"use server";

import { serverFetch } from "@/lib/server-fetch";
// Note: You should create a Zod schema for validation here,
// but for simplicity, we'll skip complex validation for now.

/* eslint-disable @typescript-eslint/no-explicit-any */
export const updateMyProfile = async (formData: FormData): Promise<any> => {
    // 1. Extract the ID and data from FormData
    const id = formData.get('id') as string;
    
    // IMPORTANT: Role and Email are intentionally excluded as per your requirement
    const updateData: { [key: string]: any } = {};
    
    // Extract common fields
    updateData.contactNumber = formData.get('contactNumber');
    // updateData.nidNumber = formData.get('nidNumber');
    updateData.name = formData.get('name'); 
    
    if (formData.get('name')) {
        updateData.name = formData.get('name'); // <--- এটি যুক্ত করুন/নিশ্চিত করুন
    }

    // Extract worker-specific fields
    if (formData.get('dailyRate')) {
        updateData.dailyRate = Number(formData.get('dailyRate'));
    }
    
    // Extract engineer/admin-specific fields
    if (formData.get('companyName')) {
        updateData.companyName = formData.get('companyName');
    }
    if (formData.get('position')) {
        updateData.position = formData.get('position');
    }

    // 2. Handle Profile Photo URL (Optional field)
    const profilePhoto = formData.get('profilePhoto') as string | null;
    if (profilePhoto !== null && profilePhoto !== '') {
        updateData.profilePhoto = profilePhoto;
    }

    if (!id) {
        return { success: false, message: "User ID is missing." };
    }

    try {
        // Use PATCH method to update the user profile
        const res = await serverFetch.patch(`/auth/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
            // serverFetch automatically handles JSON stringification
        });

        const result = await res.json();

        if (!res.ok) {
            // Handle specific API errors
            return { success: false, message: result.message || "Profile update failed." };
        }

        return { success: true, message: "Profile updated successfully!" };

    } catch (error: any) {
        console.error("Update Profile Server Action Error:", error);
        return { success: false, message: "An unexpected error occurred during update." };
    }
};