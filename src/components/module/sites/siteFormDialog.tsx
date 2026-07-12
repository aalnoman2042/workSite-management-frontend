"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateSite } from "@/services/siteServices/siteManagement";
import { ISite, SiteStatus, SiteStatuses } from "@/types/site.interface";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";

interface SiteFormDialogProps {
  site: ISite | null;
  onClose: () => void;
}

// <input type="date"> needs yyyy-mm-dd; the API sends full ISO timestamps.
const toDateInput = (value?: string | null) => (value ? value.slice(0, 10) : "");

const SiteFormDialog = ({ site, onClose }: SiteFormDialogProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<SiteStatus>(site?.status ?? "ACTIVE");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!site) return;

    const form = new FormData(event.currentTarget);
    const endDate = form.get("endDate") as string;
    const totalCost = form.get("totalCost") as string;

    setIsSaving(true);
    const result = await updateSite(site.id, {
      name: form.get("name") as string,
      location: (form.get("location") as string) || null,
      address: form.get("address") as string,
      startDate: new Date(form.get("startDate") as string).toISOString(),
      endDate: endDate ? new Date(endDate).toISOString() : null,
      totalCost: totalCost ? Number(totalCost) : null,
      status,
    });
    setIsSaving(false);

    if (result.success) {
      toast.success(result.message);
      onClose();
      startTransition(() => router.refresh());
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Dialog open={!!site} onOpenChange={(open) => !open && !isSaving && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit site</DialogTitle>
          <DialogDescription>Update the site&apos;s details and status.</DialogDescription>
        </DialogHeader>

        {site && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="name">Site name</Label>
                <Input id="name" name="name" defaultValue={site.name} required />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" defaultValue={site.location ?? ""} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" defaultValue={site.address} required />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="startDate">Start date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  defaultValue={toDateInput(site.startDate)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="endDate">End date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  defaultValue={toDateInput(site.endDate)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="totalCost">Total cost (BDT)</Label>
                <Input
                  id="totalCost"
                  name="totalCost"
                  type="number"
                  min="0"
                  defaultValue={site.totalCost ?? ""}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as SiteStatus)}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SiteStatuses.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isSaving}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SiteFormDialog;