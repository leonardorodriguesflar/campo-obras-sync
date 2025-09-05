import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusChipVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium font-ubuntu transition-smooth",
  {
    variants: {
      variant: {
        active: "bg-success text-success-foreground",
        pending: "bg-status-pending text-white",
        completed: "bg-accent text-accent-foreground",
        inactive: "bg-muted text-muted-foreground",
        "em-andamento": "bg-primary text-primary-foreground",
        "concluida": "bg-accent text-accent-foreground",
        "aberta": "bg-success text-success-foreground",
        "ativo": "bg-success text-success-foreground",
        "encerrado": "bg-status-inactive text-white",
      },
    },
    defaultVariants: {
      variant: "inactive",
    },
  }
)

export interface StatusChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusChipVariants> {}

const StatusChip = React.forwardRef<HTMLDivElement, StatusChipProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(statusChipVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
StatusChip.displayName = "StatusChip"

export { StatusChip, statusChipVariants }