import * as React from "react";

export interface ModifierBadgeProps {
  label: string;
  type?: "modifier" | "allergy";
}

export const ModifierBadge: React.FC<ModifierBadgeProps> = ({ label, type = "modifier" }) => {
  const isAllergy = type === "allergy" || label.toUpperCase().includes("ALLERGY");
  
  return (
    <span 
      className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold uppercase tracking-wider
      ${isAllergy 
        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 border border-red-200 dark:border-red-800" 
        : "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 border border-amber-200 dark:border-amber-700"}
      `}
    >
      {label}
    </span>
  );
};
