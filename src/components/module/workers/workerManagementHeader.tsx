"use client";

import ManagementPageHeader from "@/components/shared/managementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import WorkerFormDialog from "./workerFormDialog"; // Your worker form dialog

const WorkersManagementHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      <WorkerFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Workers Management"
        description="Manage Workers information and details"
        action={{
          label: "Add Worker",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
};

export default WorkersManagementHeader;
