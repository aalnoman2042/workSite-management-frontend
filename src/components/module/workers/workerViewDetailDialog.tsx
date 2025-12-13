"use client";

import InfoRow from "@/components/shared/infoRow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Calendar, DollarSign, User, Briefcase, Phone, Mail } from "lucide-react";
import { IWorker } from "@/types/worker.interface";

interface IWorkerViewDialogProps {
  open: boolean;
  onClose: () => void;
  worker: IWorker | null;
}

const WorkerViewDetailDialog = ({ open, onClose, worker }: IWorkerViewDialogProps) => {
    // console.log(worker);
    
  if (!worker) return null;

  // Helper to get initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Format Date
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "Not specified";
    const d = new Date(dateStr);
    return d.toLocaleDateString();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Worker Profile</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Worker Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br from-green-50 to-emerald-50 rounded-lg mb-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              {worker.profilePhoto ? (
                <AvatarImage src={worker.profilePhoto} alt={worker.name} />
              ) : (
                <AvatarFallback className="text-2xl">
                  {getInitials(worker.name)}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-1">{worker.name}</h2>
              <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {worker.email}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge variant={worker.isDeleted ? "destructive" : "default"} className="text-sm">
                  {worker.isDeleted ? "Inactive" : "Active"}
                </Badge>
                {worker.approved && (
                  <Badge variant="secondary" className="text-sm">
                    Approved
                  </Badge>
                )}
                {worker.onleave && (
                  <Badge variant="secondary" className="text-sm">
                    On Leave
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Worker Information */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Basic Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Briefcase className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Position" value={worker.position || "Not specified"} />
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Joining Date" value={formatDate(worker.joiningDate)} />
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Daily Rate"
                    value={worker.dailyRate ? `$${worker.dailyRate}` : "Not specified"}
                  />
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Half Day Rate"
                    value={worker.halfDayRate ? `$${worker.halfDayRate}` : "Not specified"}
                  />
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Company Name" value={worker.companyName || "Not specified"} />
                </div>
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="NID Number" value={worker.nidNumber} />
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Phone className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-lg">Contact Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Contact Number" value={worker.contactNumber} />
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Email" value={worker.email} />
                </div>
              </div>
            </div>

            <Separator />

            {/* Account Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-lg">Account Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Created At" value={formatDate(worker.createdAt)} />
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Updated At" value={formatDate(worker.updatedAt)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkerViewDetailDialog;
