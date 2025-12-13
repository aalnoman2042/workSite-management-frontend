"use client";

import DeleteConfirmationDialog from "@/components/shared/deleteConfrimationDialog";
import ManagementTable from "@/components/shared/managementTable";
// import { softDeleteWorker } from "@/services/admin/workersManagement";
// import { IWorker } from "@/types/worker.interface";
// import { IWorkerType } from "@/types/workerTypes.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
// import WorkerFormDialog from "./WorkerFormDialog";
// import { workersColumns } from "./workersColumns";
import WorkerViewDetailDialog from "./workerViewDetailDialog";
import { IWorker } from "@/types/worker.interface";
import { deleteWorker, softDeleteWorker } from "@/services/workerServices/workerManagement";
import WorkerFormDialog from "./workerFormDialog";
import { workersColumns } from "./workerColumns";

interface WorkersTableProps {
  workers: IWorker[];
//   workerTypes: IWorkerType[];

}

const WorkersTable = ({ workers}: WorkersTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingWorker, setDeletingWorker] = useState<IWorker | null>(null);
  const [viewingWorker, setViewingWorker] = useState<IWorker | null>(null);
  const [editingWorker, setEditingWorker] = useState<IWorker | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (worker: IWorker) => {
    setViewingWorker(worker);
  };

  const handleEdit = (worker: IWorker) => {
    setEditingWorker(worker);
  };

  const handleDelete = (worker: IWorker) => {
    setDeletingWorker(worker);
  };

  const confirmDelete = async () => {
    if (!deletingWorker) return;
    console.log(deletingWorker.id);
    

    setIsDeleting(true);
    const result = await deleteWorker(deletingWorker.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Worker deleted successfully");
      setDeletingWorker(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete worker");
    }
  };

  return (
    <>
      <ManagementTable
        data={workers}
        columns={workersColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(worker) => worker.id!}
        emptyMessage="No workers found"
      />

      {/* Edit Worker Form Dialog */}
      <WorkerFormDialog
        open={!!editingWorker}
        onClose={() => setEditingWorker(null)}
        worker={editingWorker!}
        onSuccess={() => {
          setEditingWorker(null);
          handleRefresh();
        }}
      />

      {/* View Worker Detail Dialog */}
      <WorkerViewDetailDialog
        open={!!viewingWorker}
        onClose={() => setViewingWorker(null)}
        worker={viewingWorker}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingWorker}
        onOpenChange={(open) => !open && setDeletingWorker(null)}
        onConfirm={confirmDelete}
        title="Delete Worker"
        description={`Are you sure you want to delete ${deletingWorker?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default WorkersTable;
