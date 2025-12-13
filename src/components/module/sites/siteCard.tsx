"use client";

import React, { useState } from "react";
import { ISite } from "@/types/site.interface";
import SiteDetailsModal from "./siteDetailModal";

interface SiteCardProps {
  site: ISite;
}

export default function SiteCard({ site }: SiteCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const assignments = site.assignments ?? [];
  const attendance = site.attendance ?? [];

  return (
    <>
      <div
        className="border rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition"
        onClick={() => setIsOpen(true)}
      >
        <h2 className="font-bold text-lg">{site.name}</h2>
        {site.location && <p className="text-gray-600">{site.location}</p>}
        <p className="text-gray-500 text-sm">{site.address}</p>
        <p className="text-gray-700 mt-2">
          {assignments.length} workers assigned
        </p>
        <p className="text-gray-700">
          {attendance.length} attendance records
        </p>
      </div>

      {isOpen && (
        <SiteDetailsModal
          site={site}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
