import WorkersTable from "@/components/module/workers/workersTable";
import { getWorkers } from "@/services/workerServices/workerManagement";
// import { approveWorker } from "@/services/chief/workerManagement";
import { queryStringFormatter } from "@/lib/formatters";
import TablePagination from "@/components/shared/tablePagination";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/shared/tableSkeleton";
import { toast } from "sonner";
import { approveWorker } from "@/services/siteServices/siteManagement";

const ChiefWorkersPage = async ({ searchParams }:{
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const query = queryStringFormatter(params);

const workersResult = await getWorkers(query);
const handleApprove = async (worker: { id: string; approved: boolean }) => {
  const newStatus = !worker.approved;  // toggle true/false

  const res = await approveWorker(worker.id, newStatus);

  if (res) toast.success(`Worker ${newStatus ? "approved" : "unapproved"}`);
  else toast.error(res || "Failed to update");

//   router.refresh();  // data reload
};

  const totalPages = Math.ceil(workersResult.data?.meta?.total);

  return (
    <Suspense fallback={<TableSkeleton columns={6} rows={6} />}>
      <WorkersTable
        workers={workersResult.data?.data}
        // onApprove={handleApprove}   // 👈 Pass approve handler
      />

      <TablePagination
        currentPage={workersResult.data?.meta?.page}
        totalPages={totalPages}
      />
    </Suspense>
  );
};

export default ChiefWorkersPage;
