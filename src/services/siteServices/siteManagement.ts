import { serverFetch } from "@/lib/server-fetch";
import { error } from "console";


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



export const assignTask = async (taskData: {
    title: string;
    description: string;
    siteId: string;
    workerId: string;
    dueDate: Date;
    workdate: Date;
}) => {
    console.log(taskData);
    
    try {
        const res = await serverFetch.post("/work-assignment/create", {
            body: JSON.stringify(taskData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return {
            success: false,
            message: err?.message || "Task assignment failed",
            
            
        };
    }
};
// console.log(error);

