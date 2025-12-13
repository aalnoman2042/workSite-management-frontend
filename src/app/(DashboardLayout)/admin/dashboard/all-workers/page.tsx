import RefreshButton from "@/components/shared/refreshButton";
import SearchFilter from "@/components/shared/searchFilter";
import SelectFilter from "@/components/shared/selectFilter";
import TablePagination from "@/components/shared/tablePagination";
import { TableSkeleton } from "@/components/shared/tableSkeleton";



// import { getAllWorkers } from "@/services/admin/workersManagement";


import { Suspense } from "react";


import { queryStringFormatter } from "@/lib/formatters";
// import WorkersManagementHeader from "@/components/module/workers/workerManagementHeader";
import WorkersTable from "@/components/module/workers/workersTable";
import { getWorkers } from "@/services/workerServices/workerManagement";
import {  WorkerPositions } from "@/types/worker.interface";


const AdminWorkersManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  // Converts object → ?searchTerm=x&type=y
  const queryString = queryStringFormatter(searchParamsObj);

  // Fetch filter options (similar to specialities)
//   const workerTypesResult = await serverFetch.get(
//     `/worker/types`
//   ).then((res) => res.json());

  // Fetch all workers
  const workersResult = await getWorkers(queryString)
//   console.log(workersResult);
  
  const totalPages = Math.ceil(
    workersResult?.data?.meta?.total 
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      {/* <WorkersManagementHeader />  */}

      {/* Filters */}
      <div className="flex space-x-2">
        <SearchFilter
          paramName="searchTerm"
          placeholder="Search worker..."
        />

<SelectFilter
  paramName="position"
  options={ WorkerPositions }
  placeholder="Filter by position"
/>

        <RefreshButton />
      </div>

      {/* Table + Pagination */}
      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <WorkersTable
          workers={workersResult.data?.data}
        />

        <TablePagination
          currentPage={workersResult.data?.meta?.page}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
};

export default AdminWorkersManagementPage;
