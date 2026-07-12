/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

// Every worker's attendance. Backend guards this with auth(ADMIN, CHIEF_ENGINEER, SITE_ENGINEER),
// so a WORKER token gets a 401 here and must use getMyAttendance instead.
export async function getAllAttendance(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/attendance/all-attendance${queryString ? `?${queryString}` : ""}`
    );
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

// The logged-in worker's own attendance. The backend takes the worker id from the token,
// so a workerId in the query string cannot be used to read anyone else's records.
export async function getMyAttendance(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/attendance/my-attendance${queryString ? `?${queryString}` : ""}`
    );
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