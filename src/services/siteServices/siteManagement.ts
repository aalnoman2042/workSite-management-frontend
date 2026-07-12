/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { ISite, SiteStatus } from "@/types/site.interface";

// This module used to have no "use server" directive, so when a client component imported
// it (createSiteForm, taskAssignForm) the fetch ran in the browser — where the Cookie header
// is a forbidden header and is silently dropped. Those calls therefore carried no auth at
// all, and only worked because the /site endpoints were unguarded. As server actions the
// request runs on the server and serverFetch forwards the cookie properly.

// Returns a plain object rather than the Response: a server action's return value has to be
// serializable to cross back to the client.
export const approveWorker = async (id: string, status: boolean) => {
    try {
        const response = await serverFetch.patch(`/workers/${id}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isApproved: status }),
        });

        const result = await response.json();

        return {
            success: response.ok && !!result.success,
            message: result?.message || "Approve failed",
        };
    } catch (err: any) {
        return {
            success: false,
            message: err?.message || "Approve failed",
        };
    }
};

// Every site, running ones first (the backend applies the ordering).
export const getallSites = async (): Promise<ISite[]> => {
    try {
        const response = await serverFetch.get("/site");
        const result = await response.json();

        if (!response.ok || !result.success) {
            console.error("Failed to fetch sites:", result?.message);
            return [];
        }

        return result.data ?? [];
    } catch (error: any) {
        console.error(error);
        return [];
    }
};

// Only the sites the logged-in site engineer actually works on. The backend derives them
// from the caller's own assignments and attendance, so the id cannot be spoofed.
export const getMySites = async (): Promise<ISite[]> => {
    try {
        const response = await serverFetch.get("/site/my-sites");
        const result = await response.json();

        if (!response.ok || !result.success) {
            console.error("Failed to fetch my sites:", result?.message);
            return [];
        }

        return result.data ?? [];
    } catch (error: any) {
        console.error(error);
        return [];
    }
};

export const createSite = async (payload: {
    name: string;
    location?: string | null;
    address: string;
    startDate: string | null;
    endDate?: string | null;
    totalCost?: number | null;
}) => {
    try {
        const response = await serverFetch.post("/site", {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            return {
                success: false,
                message: result?.message || "Failed to create site.",
                errors: result?.errors,
            };
        }

        return { success: true, message: "Site created successfully", data: result.data };
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
        };
    }
};

export const updateSite = async (
    id: string,
    payload: Partial<{
        name: string;
        location: string | null;
        address: string;
        startDate: string;
        endDate: string | null;
        totalCost: number | null;
        status: SiteStatus;
    }>
) => {
    try {
        const response = await serverFetch.patch(`/site/update/${id}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            return { success: false, message: result?.message || "Failed to update site." };
        }

        return { success: true, message: "Site updated successfully", data: result.data };
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
        };
    }
};

export const deleteSite = async (id: string) => {
    try {
        const response = await serverFetch.delete(`/site/${id}`);
        const result = await response.json();

        if (!response.ok || !result.success) {
            return { success: false, message: result?.message || "Failed to delete site." };
        }

        return { success: true, message: "Site deleted successfully" };
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
        };
    }
};

export const assignTask = async (taskData: {
    title: string;
    description: string;
    siteId: string;
    workerId: string;
    dueDate: Date;
    workdate: Date;
}) => {
    try {
        const response = await serverFetch.post("/work-assignment/create", {
            body: JSON.stringify(taskData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        return {
            success: response.ok && !!result.success,
            message: result?.message || "Task assignment failed",
            data: result?.data,
        };
    } catch (err: any) {
        return {
            success: false,
            message: err?.message || "Task assignment failed",
        };
    }
};