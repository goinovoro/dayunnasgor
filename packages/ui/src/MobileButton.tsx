import * as React from "react";

export interface MobileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
}

export const MobileButton = React.forwardRef<HTMLButtonElement, MobileButtonProps>(
  ({ className = "", variant = "primary", ...props }, ref) => {
    
    let variantStyles = "";
    switch (variant) {
      case "primary":
        variantStyles = "bg-blue-600 text-white active:bg-blue-700 dark:bg-blue-500 dark:active:bg-blue-600";
        break;
      case "secondary":
        variantStyles = "bg-gray-200 text-gray-900 active:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:active:bg-gray-700";
        break;
      case "danger":
        variantStyles = "bg-red-600 text-white active:bg-red-700 dark:bg-red-500 dark:active:bg-red-600";
        break;
      case "success":
        variantStyles = "bg-green-600 text-white active:bg-green-700 dark:bg-green-500 dark:active:bg-green-600";
        break;
    }

    return (
      <button
        ref={ref}
        className={`min-h-[48px] min-w-[48px] px-6 py-3 rounded-xl font-bold text-lg flex items-center justify-center transition-transform active:scale-95 touch-manipulation select-none ${variantStyles} ${className}`}
        {...props}
      />
    );
  }
);
MobileButton.displayName = "MobileButton";
