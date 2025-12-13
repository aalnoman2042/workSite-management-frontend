/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IWorker, WorkerPosition } from "@/types/worker.interface";
import { createWorkerZodSchema, updateWorkerZodSchema } from "@/zod/worker.validation";

export async function createWorker(_prevState: any, formData: FormData) {
  try {
    const payload: Partial<IWorker> & { password?: string } = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      contactNumber: formData.get("contactNumber") as string,
      nidNumber: formData.get("nidNumber") as string,
      position: formData.get("position") as WorkerPosition,
      joiningDate: formData.get("joiningDate") as string,
      
      dailyRate: Number(formData.get("dailyRate") as string),
      halfDayRate: Number(formData.get("halfDayRate") as string),
      companyName: formData.get("companyName") as string,
      
      password: formData.get("password") as string,
      profilePhoto: undefined,
    };

    const validation = zodValidator(payload, createWorkerZodSchema);
    if (!validation.success || !validation.data) return validation;

    const validatedPayload = validation.data;

    const newPayload = {
      password: validatedPayload.password,
      worker: {
        name: validatedPayload.name,
        email: validatedPayload.email,
        contactNumber: validatedPayload.contactNumber,
        nidNumber: validatedPayload.nidNumber,
        position: validatedPayload.position,
        dailyRate: validatedPayload.dailyRate,
        halfDayRate: validatedPayload.halfDayRate,
        companyName: validatedPayload.companyName,
        joiningDate: validatedPayload.joiningDate,
      },
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(newPayload));

    if (formData.get("profilePhoto")) {
      newFormData.append("profilePhoto", formData.get("profilePhoto") as Blob);
    }

    const response = await serverFetch.post("/user/create-worker", {
      body: newFormData,
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
    };
  }
}

export async function getWorkers(queryString?: string) {
  try {
    const response = await serverFetch.get(`/worker${queryString ? `?${queryString}` : ""}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
    };
  }
}

export async function getWorkerById(id: string) {
  try {
    const response = await serverFetch.get(`/worker/${id}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
    };
  }
}

export async function updateWorker(id: string, _prevState: any, formData: FormData) {
    // console.log(id);
    
  try {
    const payload: Partial<IWorker> = {
      name: formData.get("name") as string,
      contactNumber: formData.get("contactNumber") as string,
      nidNumber: formData.get("nidNumber") as string,
      position: formData.get("position") as WorkerPosition,
      dailyRate: Number(formData.get("dailyRate") as string),
      halfDayRate: Number(formData.get("halfDayRate") as string),
      approved: formData.get("approved") === "true" ? true : false,
      companyName: formData.get("companyName") as string,
      joiningDate: formData.get("joiningDate") ? (formData.get("joiningDate") as string) : undefined,
    };

    const validatedPayload = zodValidator(payload, updateWorkerZodSchema).data;
    // console.log(validatedPayload);
    

    const response = await serverFetch.patch(`/worker/${id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
    };
  }
}

export async function softDeleteWorker(id: string) {
  try {
    const response = await serverFetch.patch(`/worker/soft-delete/${id}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
    };
  }
}

export async function deleteWorker(id: string) {
  try {
    const response = await serverFetch.delete(`/worker/${id}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
    };
  }
}
