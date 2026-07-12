import React from "react";

// SelectFilter always defaults its value to "All", so its `placeholder` never renders and
// two selects side by side both just read "All". This puts the name above the control.
const FilterField = ({ label, children }: { label: string; children: React.ReactNode }) => {
  return (
    <div className="space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </div>
  );
};

export default FilterField;