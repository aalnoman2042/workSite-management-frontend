"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { ISite } from "@/types/site.interface";
import { CalendarDays, Coins, MapPin, Pencil, Trash2, UserCheck, Users } from "lucide-react";
import SiteStatusBadge from "./siteStatusBadge";
import { getSiteStats } from "./siteStats";

interface SiteCardProps {
  site: ISite;
  canManage?: boolean;
  onView: (site: ISite) => void;
  onEdit?: (site: ISite) => void;
  onDelete?: (site: ISite) => void;
}

export default function SiteCard({ site, canManage, onView, onEdit, onDelete }: SiteCardProps) {
  const stats = getSiteStats(site);

  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-2">
          <button onClick={() => onView(site)} className="min-w-0 flex-1 cursor-pointer text-left">
            <h3 className="truncate font-semibold hover:underline">{site.name}</h3>
          </button>
          <SiteStatusBadge status={site.status} />
        </div>

        <div className="space-y-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{site.location || site.address}</span>
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {formatDate(site.startDate)} → {site.endDate ? formatDate(site.endDate) : "ongoing"}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Coins className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {site.totalCost ? formatCurrency(site.totalCost) : "Cost not set"}
            </span>
          </p>
        </div>

        {stats.progress !== null && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Schedule</span>
              <span>{stats.progress}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${stats.progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 border-t pt-3 text-center">
          <div>
            <p className="flex items-center justify-center gap-1 text-lg font-bold">
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              {stats.workerCount}
            </p>
            <p className="text-xs text-muted-foreground">Workers</p>
          </div>
          <div>
            <p className="flex items-center justify-center gap-1 text-lg font-bold">
              <UserCheck className="h-3.5 w-3.5 text-muted-foreground" />
              {stats.presentToday}
            </p>
            <p className="text-xs text-muted-foreground">Present today</p>
          </div>
          <div>
            <p className="text-lg font-bold">{stats.pendingAssignments}</p>
            <p className="text-xs text-muted-foreground">Open tasks</p>
          </div>
        </div>

        <div className="mt-auto flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onView(site)}>
            View details
          </Button>

          {canManage && (
            <>
              <Button variant="outline" size="sm" onClick={() => onEdit?.(site)}>
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => onDelete?.(site)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}