import React from "react";
import { cn } from "../lib/utils";

interface ProgressBarProps {
  label?: string;
  completed: number;
  total: number;
  className?: string;
  showRatio?: boolean;
  variant?: "default" | "success" | "warning" | "danger";
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  label = "All tasks",
  completed,
  total,
  className,
  showRatio = true,
  variant = "default",
}) => {
  const percentage = total > 0 ? Math.min((completed / total) * 100, 100) : 0;
  const ratio = `${completed}/${total}`;

  const variantStyles = {
    default: {
      fill: "bg-primary-100",
      glow: "shadow-purple-200",
      text: "text-gray-700",
    },
    success: {
      fill: "bg-green-500",
      glow: "shadow-green-200",
      text: "text-gray-700",
    },
    warning: {
      fill: "bg-yellow-500",
      glow: "shadow-yellow-200",
      text: "text-gray-700",
    },
    danger: {
      fill: "bg-red-500",
      glow: "shadow-red-200",
      text: "text-gray-700",
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between items-center">
        <span className={cn("text-sm font-medium", currentVariant.text)}>
          {label}
        </span>
        {showRatio && (
          <span className={cn("text-sm font-medium", currentVariant.text)}>
            {ratio}
          </span>
        )}
      </div>

      <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            currentVariant.fill,
            currentVariant.glow,
            "shadow-lg"
          )}
          style={{
            width: `${percentage}%`,
            boxShadow: `0 0 8px rgba(149, 0, 240, 0.3)`,
          }}
        />
      </div>
    </div>
  );
};

// Example usage component
export const ProgressBarExample: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <ProgressBar
        label="All tasks"
        completed={2}
        total={3}
        variant="default"
      />
    </div>
  );
};

export default ProgressBar;
