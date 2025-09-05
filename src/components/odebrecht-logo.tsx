import * as React from "react"
import { cn } from "@/lib/utils"

export interface OdebrechtLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "full" | "compact" | "symbol"
  theme?: "default" | "white"
}

const OdebrechtLogo = React.forwardRef<HTMLDivElement, OdebrechtLogoProps>(
  ({ className, variant = "full", theme = "default", ...props }, ref) => {
    const textColor = theme === "white" ? "text-white" : "text-secondary"
    
    return (
      <div
        ref={ref}
        className={cn("flex items-center font-ubuntu", className)}
        {...props}
      >
        {/* Símbolo Odebrecht - Versão simplificada */}
        <div className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full mr-3",
          theme === "white" ? "bg-white" : "bg-primary"
        )}>
          <div className={cn(
            "w-6 h-6 rounded-full border-2",
            theme === "white" ? "border-primary" : "border-white"
          )} />
        </div>
        
        {variant === "full" && (
          <div className="flex flex-col">
            <div className={cn("text-xl font-bold tracking-tight", textColor)}>
              ODEBRECHT
            </div>
            <div className={cn("text-sm font-medium -mt-1", textColor)}>
              Engenharia & Construção
            </div>
          </div>
        )}
        
        {variant === "compact" && (
          <div className={cn("text-lg font-bold tracking-tight", textColor)}>
            EPC
          </div>
        )}
      </div>
    )
  }
)
OdebrechtLogo.displayName = "OdebrechtLogo"

export { OdebrechtLogo }