"use client";

import InputFieldError from "@/components/shared/inputFielsError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createWorker, updateWorker } from "@/services/workerServices/workerManagement";
import { IWorker } from "@/types/worker.interface";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface IWorkerFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  worker?: IWorker;
}

const WorkerFormDialog = ({ open, onClose, onSuccess, worker }: IWorkerFormDialogProps) => {
  const isEdit = !!worker;

  const [position, setPosition] = useState<string>(worker?.position || "");
  const [approved, setApproved] = useState<string>(
    worker?.approved ? "true" : "false"
  );

  const [state, formAction, pending] = useActionState(
    isEdit ? updateWorker.bind(null, worker.id!) : createWorker,
    null
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      onSuccess();
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEdit ? "Edit Worker" : "Add New Worker"}</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">

            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                defaultValue={worker?.name}
              />
              <InputFieldError state={state} field="name" />
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="worker@example.com"
                defaultValue={worker?.email}
                disabled={isEdit}
              />
              <InputFieldError state={state} field="email" />
            </Field>

            {/* Password fields only when creating */}
            {!isEdit && (
              <>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" name="password" type="password" />
                  <InputFieldError state={state} field="password" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                  <Input id="confirmPassword" name="confirmPassword" type="password" />
                  <InputFieldError state={state} field="confirmPassword" />
                </Field>
              </>
            )}

            {/* Contact Number */}
            <Field>
              <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="+8801XXXXXXXX"
                defaultValue={worker?.contactNumber}
              />
              <InputFieldError state={state} field="contactNumber" />
            </Field>

            {/* NID */}
            <Field>
              <FieldLabel htmlFor="nidNumber">NID Number</FieldLabel>
              <Input
                id="nidNumber"
                name="nidNumber"
                defaultValue={worker?.nidNumber}
              />
              <InputFieldError state={state} field="nidNumber" />
            </Field>

            {/* Position */}
            <Field>
              <FieldLabel htmlFor="position">Position</FieldLabel>
              <Select value={position} onValueChange={setPosition} name="position">
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SENIOR_TECHNICIAN">Senior Technician</SelectItem>
                  <SelectItem value="JUNIOR_TECHNICIAN">Junior Technician</SelectItem>
                  <SelectItem value="SENIOR_HELPER">Senior Helper</SelectItem>
                  <SelectItem value="JUNIOR_HELPER">Junior Helper</SelectItem>
                  <SelectItem value="ELECTRICIAN">Electrician</SelectItem>
                  <SelectItem value="PLUMBER">Plumber</SelectItem>
                  <SelectItem value="CARPENTER">Carpenter</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
              <InputFieldError state={state} field="position" />
            </Field>

            {/* Daily Rate */}
            <Field>
              <FieldLabel htmlFor="dailyRate">Daily Rate</FieldLabel>
              <Input
                id="dailyRate"
                name="dailyRate"
                type="number"
                defaultValue={worker?.dailyRate ?? "not specified yet"}
              />
              <InputFieldError state={state} field="dailyRate" />
            </Field>

            {/* Half Day Rate */}
            <Field>
              <FieldLabel htmlFor="halfDayRate">Half Day Rate</FieldLabel>
              <Input
                id="halfDayRate"
                name="halfDayRate"
                type="number"
                defaultValue={worker?.halfDayRate ?? "not specified yet"}
              />
              <InputFieldError state={state} field="halfDayRate" />
            </Field>

            {/* APPROVED FIELD (only show when editing) */}
            {isEdit && (
              <Field>
                <FieldLabel htmlFor="approved">Approval Status</FieldLabel>
                <Select
                  value={approved}
                  onValueChange={setApproved}
                  name="approved"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select approval status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Approved</SelectItem>
                    <SelectItem value="false">Unapproved</SelectItem>
                  </SelectContent>
                </Select>
                <InputFieldError state={state} field="approved" />
              </Field>
            )}

            {/* Hidden fields */}
            <input type="hidden" name="position" value={position} />
            {isEdit && <input type="hidden" name="approved" value={approved} />}

          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : isEdit ? "Update Worker" : "Add Worker"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WorkerFormDialog;
