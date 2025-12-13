"use client";

import React from "react";
import SiteCard from "./siteCard";
import { ISite } from "@/types/site.interface";

interface SiteListProps {
  sites: ISite[];
}

export default function SiteList({ sites }: SiteListProps) {
  if (!sites || sites.length === 0) {
    return <p>No sites available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sites.map(site => (
        <SiteCard key={site.id} site={site} />
      ))}
    </div>
  );
}
