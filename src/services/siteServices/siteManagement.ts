import { serverFetch } from "@/lib/server-fetch";


export const approveWorker = async (id: string, status: boolean) => {
    try {
        const res = await serverFetch.patch(`/workers/${id}`, {
            body: JSON.stringify({ isApproved: status }),
        });

        return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return {
            success: false,
            message: err?.message || "Approve failed",
        };
    }
};


export const getallSites = async () => {
  const response = await serverFetch.get("/site"); 
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to fetch sites.");
    }
    return result.data;
};