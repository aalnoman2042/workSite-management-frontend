// services/auth/registerWorker.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerWorkerValidationZodSchema } from "@/zod/auth.validation";
import { loginUser } from "./loginUser";


export const registerWorker = async (_currentState: any, formData: any): Promise<any> => {
    try {
        // 1. EXTRACT ALL RAW DATA FROM FORM DATA
        const payload = {
            name: formData.get('name'),
            nidNumber: formData.get('nidNumber'),
            profilePhoto: formData.get('profilePhoto'), // Optional
            contactNumber: formData.get('contactNumber'), // REQUIRED by your Postman data
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        }

        // 🚨 DEBUG: Confirm payload is an object before validation
        console.log("Zod Input Check (Content):", payload);

        // 2. RUN VALIDATION
        const validationResult = zodValidator(payload, registerWorkerValidationZodSchema);
        
        if (validationResult.success === false) {
            // This is where the error came from previously if payload was undefined.
            return validationResult; 
        }

        // 3. CONSTRUCT FLAT JSON BODY FOR POSTMAN-STYLE API CALL
        const validatedPayload: any = validationResult.data;
        const registerData = {
            email: validatedPayload.email,          // Match Postman structure
            password: validatedPayload.password,    // Match Postman structure
            name: validatedPayload.name,            // Match Postman structure
            nidNumber: validatedPayload.nidNumber,  // Match Postman structure
            contactNumber: validatedPayload.contactNumber, // Match Postman structure
            profilePhoto: validatedPayload.profilePhoto, // Optional, Zod handles null
            // We omit 'confirmPassword' as it's only for frontend validation
        }

        // 4. API CALL (Sending JSON)
        // Ensure serverFetch handles Content-Type: application/json
        const res = await serverFetch.post("/user/register-worker", {
          headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registerData),
        })

        // 5. PROCESS RESPONSE (Remember the JSON parsing issue)
        if (!res.ok) {
            const errorText = await res.text();
            console.error("API Call Failed Status:", res.status);
            // Handle error, maybe try to parse it as JSON if it's not HTML
            try {
                const errorJson = JSON.parse(errorText);
                return { success: false, message: errorJson.message || "Registration failed on API side." };
            } catch {
                return { success: false, message: `API returned an error (${res.status}). Check server logs.` };
            }
        }
        
        const result = await res.json();


        if (result.success) {
            // Attempt to log the user in
            await loginUser(_currentState, formData);
        }

        return result;

    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.error("Server Action Catch Block Error:", error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
    }
}