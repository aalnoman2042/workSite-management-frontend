/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import {
  IAdminStats,
  IChiefEngineerStats,
  ISiteEngineerStats,
  IWorkerStats,
} from "@/types/stats.interface";

// The backend guards each of these with auth(ROLE) and derives the caller from the token,
// so a role can only ever pull its own permitted slice.
const getStats = async <T>(endpoint: string): Promise<T | null> => {
  try {
    const response = await serverFetch.get(endpoint, { cache: "no-store" });

    // An unknown route on the API answers with Express' HTML 404 page, not JSON, so read
    // the body as text first — response.json() on HTML throws a confusing SyntaxError.
    const body = await response.text();
    const isJson = response.headers.get("content-type")?.includes("application/json");

    if (!isJson) {
      console.error(
        `[stats] ${endpoint} returned ${response.status} (${
          response.headers.get("content-type") || "no content-type"
        }), not JSON. Is NEXT_PUBLIC_BASE_API_URL pointing at a backend that has /stats?`
      );
      return null;
    }

    const result = JSON.parse(body);

    if (!response.ok || !result.success) {
      console.error(`[stats] ${endpoint} failed (${response.status}):`, result.message);
      return null;
    }

    return result.data as T;
  } catch (error: any) {
    console.error(`[stats] ${endpoint} errored:`, error.message);
    return null;
  }
};

export async function getAdminStats() {
  return getStats<IAdminStats>("/stats/admin");
}

export async function getChiefEngineerStats() {
  return getStats<IChiefEngineerStats>("/stats/chief-engineer");
}

export async function getSiteEngineerStats() {
  return getStats<ISiteEngineerStats>("/stats/site-engineer");
}

export async function getWorkerStats() {
  return getStats<IWorkerStats>("/stats/worker");
}