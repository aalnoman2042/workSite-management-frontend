/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const askAI = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        const query = formData.get("query")?.toString().trim();

        if (!query) {
            return { success: false, message: "Please type a question." };
        }

        const res = await serverFetch.post("/ai/suggest", {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
            return {
                success: false,
                message: result?.message || "AI is unavailable. Try again.",
            };
        }

        return { success: true, query, answer: result.data };
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === "development" ? error.message : "AI is unavailable. Try again."}`,
        };
    }
};