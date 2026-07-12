"use client";

import DeleteConfirmationDialog from "@/components/shared/deleteConfrimationDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteSite } from "@/services/siteServices/siteManagement";
import { ISite, SiteStatuses, sortSitesRunningFirst } from "@/types/site.interface";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import SiteCard from "./siteCard";
import SiteDetailsModal from "./siteDetailModal";
import SiteFormDialog from "./siteFormDialog";

interface SiteListProps {
  sites: ISite[];
  canManage?: boolean;
  emptyMessage?: string;
}

export default function SiteList({
  sites,
  canManage = false,
  emptyMessage = "No sites available.",
}: SiteListProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [viewingSite, setViewingSite] = useState<ISite | null>(null);
  const [editingSite, setEditingSite] = useState<ISite | null>(null);
  const [deletingSite, setDeletingSite] = useState<ISite | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Running sites first. The backend already orders them this way; re-sorting here keeps it
  // correct after filtering, and for any caller that passes an unsorted list.
  const visibleSites = useMemo(() => {
    const term = search.trim().toLowerCase();

    const filtered = sites.filter((site) => {
      const matchesStatus = statusFilter === "ALL" || site.status === statusFilter;
      const matchesSearch =
        !term ||
        site.name.toLowerCase().includes(term) ||
        (site.location ?? "").toLowerCase().includes(term) ||
        site.address.toLowerCase().includes(term);

      return matchesStatus && matchesSearch;
    });

    return sortSitesRunningFirst(filtered);
  }, [sites, search, statusFilter]);

  const confirmDelete = async () => {
    if (!deletingSite) return;

    setIsDeleting(true);
    const result = await deleteSite(deletingSite.id);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message);
      setDeletingSite(null);
      startTransition(() => router.refresh());
    } else {
      toast.error(result.message);
    }
  };

  const runningCount = sites.filter((site) => site.status === "ACTIVE").length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, location or address..."
            className="pl-10"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="sm:w-[200px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All statuses</SelectItem>
            {SiteStatuses.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {visibleSites.length} of {sites.length} site(s) · {runningCount} running.
      </p>

      {visibleSites.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center text-sm text-muted-foreground">
            {sites.length === 0 ? emptyMessage : "No sites match your filters."}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleSites.map((site) => (
            <SiteCard
              key={site.id}
              site={site}
              canManage={canManage}
              onView={setViewingSite}
              onEdit={setEditingSite}
              onDelete={setDeletingSite}
            />
          ))}
        </div>
      )}

      <SiteDetailsModal
        site={viewingSite}
        open={!!viewingSite}
        onClose={() => setViewingSite(null)}
      />

      {canManage && (
        <>
          <SiteFormDialog site={editingSite} onClose={() => setEditingSite(null)} />

          <DeleteConfirmationDialog
            open={!!deletingSite}
            onOpenChange={(open) => !open && setDeletingSite(null)}
            onConfirm={confirmDelete}
            title="Delete site"
            description={`Are you sure you want to delete ${deletingSite?.name}? This cannot be undone.`}
            isDeleting={isDeleting}
          />
        </>
      )}
    </div>
  );
}