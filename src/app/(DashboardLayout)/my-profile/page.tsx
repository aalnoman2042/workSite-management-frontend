// src\app\(DashboardLayout)\my-profile\page.tsx

import Image from "next/image";
import { serverFetch } from "@/lib/server-fetch";
import userLogo from "@/assets/logo/avatar.png";
import UpdateProfileButton from "@/components/module/Auth/updateProfile";
import { getCookie } from "@/services/auth/tokenHandler"; // Assuming this is a Server Action or utility
import jwt from 'jsonwebtoken';
import { notFound } from "next/navigation"; // Next.js built-in utility for 404/not authenticated

/* =======================
    Types
======================= */

type UserRole = "ADMIN" | "CHIEF_ENGINEER" | "SITE_ENGINEER" | "WORKER";

// Note: role ফিল্ডটি API থেকে না এলেও, আমরা এটিকে MyProfile ইন্টারফেসে রাখছি 
// কারণ আমরা এটিকে ম্যানুয়ালি টোকেন থেকে যুক্ত করব।
interface MyProfile {
    id: string;
    name: string;
    email: string;
    role: UserRole; // TBD: Set from Token

    profilePhoto: string | null;
    companyName: string | null;
    contactNumber: string | null;

    approved: boolean;
    banned: boolean;
    nidNumber: string | null;
    dailyRate: number | null;
    position: string | null;

    createdAt: string;
}

/* =======================
    Helpers (Same as before)
======================= */
const resolveProfilePhoto = (photo?: string | null) => {
    if (!photo || photo === '') return userLogo;
    if (photo.startsWith("http")) return photo;
    return userLogo;
};

const getRoleStyle = (role: UserRole) => {
    switch (role) {
        case 'ADMIN':
            return 'bg-red-100 text-red-700';
        case 'CHIEF_ENGINEER':
            return 'bg-indigo-100 text-indigo-700';
        case 'SITE_ENGINEER':
            return 'bg-green-100 text-green-700';
        case 'WORKER':
            return 'bg-yellow-100 text-yellow-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
};

const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
        case 'CHIEF_ENGINEER':
            return 'Chief Engineer';
        case 'SITE_ENGINEER':
            return 'Site Engineer';
        default:
            return role;
    }
}

const InfoRow = ({
    label,
    value,
}: {
    label: string;
    value?: string | number | boolean | null;
}) => {
    let displayValue: string | number | null = null;
    if (typeof value === 'boolean') {
        displayValue = value ? "Yes" : "No";
    } else if (value !== null && value !== undefined) {
        displayValue = value;
    }
    return (
        <div className="flex flex-col space-y-0.5 border-b border-gray-100 pb-3">
            <p className="text-xs font-semibold uppercase text-gray-500">{label}</p>
            <p className={`font-medium text-gray-900 ${!displayValue ? 'text-gray-400 italic' : ''}`}>
                {displayValue ?? "Not provided"}
            </p>
        </div>
    );
};

/* =======================
    Page Component
======================= */

const MyProfilePage = async () => {
    // 1. Fetch Profile Data (excluding role)
    const res = await serverFetch.get("/auth/me");

    if (!res.ok) {
        return (
            <div className="flex h-screen items-center justify-center p-6 text-xl text-red-500">
                Failed to load profile. Please check your network and authorization.
            </div>
        );
    }

    const response = await res.json();
    const userData: Omit<MyProfile, 'role'> = response.data; // Temporarily exclude 'role'

    // 2. Extract Role from Token
    const accessToken = await getCookie("accessToken");
    let userRole: UserRole | null = null;
    
    if (accessToken) {
        try {
            // WARNING: process.env.JWT_SECRET অবশ্যই Server Environment এ সেট করা থাকতে হবে
            const decodedToken = jwt.verify(accessToken as string, process.env.JWT_SECRET as string) as { role: UserRole };
            userRole = decodedToken.role;
        } catch (error) {
            console.error("JWT Verification failed:", error);
            // যদি টোকেন Invalid হয়, তবে ব্যবহারকারীকে লগইন পেজে বা 404 পেজে পাঠান।
            return notFound(); 
        }
    }

    // 3. Final Safety Check & Role Injection
    if (!userData || !userRole) {
        console.error("Critical Error: User data or Role is missing after fetch/decode.");
        return notFound(); 
    }
    
    // Role Injection: userData object-এ role property যোগ করা হলো
    const finalUserData: MyProfile = { ...userData, role: userRole };
      console.log(finalUserData);
      

    const isWorker = finalUserData.role === 'WORKER';
    const isAdminOrEngineer = finalUserData.role === 'ADMIN' || finalUserData.role === 'CHIEF_ENGINEER' || finalUserData.role === 'SITE_ENGINEER';
    const profileDisplayName = getRoleDisplayName(finalUserData.role);

    // UpdateProfileButton-এর জন্য প্রয়োজনীয় ডেটা নিশ্চিত করা
    const profileDataForButton = {
        id: finalUserData.id,
        role: finalUserData.role,
        contactNumber: finalUserData.contactNumber,
        nidNumber: finalUserData.nidNumber,
        profilePhoto: finalUserData.profilePhoto,
        dailyRate: finalUserData.dailyRate,
        companyName: finalUserData.companyName,
        position: finalUserData.position,
        email: finalUserData.email,
        name: finalUserData.name, 
    };


    return (
        <div className="relative flex justify-center p-4 sm:p-8"> 
            
            {/* UPDATE BUTTON PLACEMENT */}
            <UpdateProfileButton userData={profileDataForButton} />

            <div className="w-full max-w-4xl rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden">
                
                {/* 1. Header */}
                <div className="bg-gray-900 p-8 text-white flex flex-col items-center justify-center space-y-4">
                    <Image
                        src={resolveProfilePhoto(finalUserData.profilePhoto)}
                        alt="Profile Photo"
                        width={120}
                        height={120}
                        className="rounded-full object-cover border-4 border-white shadow-lg"
                        unoptimized={typeof resolveProfilePhoto(finalUserData.profilePhoto) === 'string'}
                    />

                    <div className="text-center space-y-1">
                        <h2 className="text-3xl font-extrabold tracking-tight">
                            {finalUserData.name || "Unnamed User"}
                        </h2>
                        <p className="text-gray-300 font-light">{finalUserData.email}</p>

                        <span className={`inline-block rounded-full px-4 py-1 text-sm font-semibold mt-2 ${getRoleStyle(finalUserData.role)}`}>
                            {profileDisplayName} 
                        </span>
                    </div>
                </div>

                {/* 2. Main Content Grid */}
                <div className="p-6 sm:p-8 md:p-10 space-y-10">
                    
                    {/* General Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">General Information</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                            
                            {/* BASE FIELDS */}
                            <InfoRow label="Email" value={finalUserData.email} /> 
                            <InfoRow label="Contact Number" value={finalUserData.contactNumber} />
                            <InfoRow label="NID Number" value={finalUserData.nidNumber} />
                            <InfoRow label="Position / Title" value={finalUserData.position} />

                            {/* ROLE-SPECIFIC FIELDS */}
                            
                            {/* Company Name (For Admins/Engineers) */}
                            {isAdminOrEngineer && finalUserData.companyName && (
                                <InfoRow label="Company Name" value={finalUserData.companyName} />
                            )}

                            {/* Daily Rate (For Workers) */}
                            {isWorker && (
                                <InfoRow
                                    label="Daily Rate"
                                    value={
                                        finalUserData.dailyRate
                                            ? `৳${finalUserData.dailyRate.toFixed(2)}`
                                            : null
                                    }
                                />
                            )}
                        </div>
                    </div>

                    {/* Account Status Section */}
                    <div className="space-y-4 pt-4">
                        <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Account Status</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4">
                            
                            {/* Approved Status (Worker-এর জন্য) */}
                            {isWorker && (
                                <InfoRow
                                    label="Account Approved"
                                    value={finalUserData.approved}
                                />
                            )}

                            {/* Banned Status */}
                            {typeof finalUserData.banned === "boolean" && (
                                <InfoRow
                                    label="User Banned"
                                    value={finalUserData.banned}
                                />
                            )}
                            
                            {/* Joined Date */}
                            <InfoRow
                                label="Joined Date"
                                value={new Date(finalUserData.createdAt).toLocaleDateString()}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MyProfilePage;