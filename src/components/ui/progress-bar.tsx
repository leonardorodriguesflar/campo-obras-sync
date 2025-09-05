import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value = 0, max = 100, showLabel = true, size = "md", ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    
    const sizeClasses = {
      sm: "h-2",
      md: "h-3",
      lg: "h-4"
    }

    return (
      <div
        ref={ref}
        className={cn("w-full", className)}
        {...props}
      >
        {showLabel && (
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-ubuntu text-foreground">Progresso</span>
            <span className="text-sm font-ubuntu font-medium text-primary">{Math.round(percentage)}%</span>
          </div>
        )}
        <div className={cn(
          "w-full bg-muted rounded-full overflow-hidden",
          sizeClasses[size]
        )}>
          <div
            className="h-full bg-gradient-success transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)
ProgressBar.displayName = "ProgressBar"

export { ProgressBar }