import * as React from "react"
import { cn } from "@/lib/utils"
import { Wifi, WifiOff, RefreshCw } from "lucide-react"

export interface ConnectionStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  isOnline?: boolean
  lastSync?: string
  onSync?: () => void
}

const ConnectionStatus = React.forwardRef<HTMLDivElement, ConnectionStatusProps>(
  ({ className, isOnline = true, lastSync, onSync, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-ubuntu",
          isOnline ? "bg-success/10 text-success" : "bg-status-pending/10 text-status-pending",
          className
        )}
        {...props}
      >
        {isOnline ? (
          <Wifi className="h-3 w-3" />
        ) : (
          <WifiOff className="h-3 w-3" />
        )}
        <span className="font-medium">
          {isOnline ? "Online" : "Offline"}
        </span>
        {lastSync && (
          <span className="text-muted-foreground">
            • {lastSync}
          </span>
        )}
        {onSync && (
          <button
            onClick={onSync}
            className="ml-2 p-1 hover:bg-background rounded-full transition-smooth"
            aria-label="Sincronizar"
          >
            <RefreshCw className="h-3 w-3" />
          </button>
        )}
      </div>
    )
  }
)
ConnectionStatus.displayName = "ConnectionStatus"

export { ConnectionStatus }