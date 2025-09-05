import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { StatusChip } from "@/components/ui/status-chip"

export interface ContractCardProps extends React.HTMLAttributes<HTMLDivElement> {
  codigo: string
  nome: string
  cliente: string
  empresa: string
  status: "ATIVO" | "ENCERRADO"
  onSelect?: () => void
}

const ContractCard = React.forwardRef<HTMLDivElement, ContractCardProps>(
  ({ className, codigo, nome, cliente, empresa, status, onSelect, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "p-4 cursor-pointer hover:shadow-primary transition-smooth hover:border-primary",
          className
        )}
        onClick={onSelect}
        {...props}
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col">
            <span className="text-sm font-ubuntu font-medium text-muted-foreground">
              Código: {codigo}
            </span>
            <h3 className="font-ubuntu font-bold text-foreground text-lg leading-tight">
              {nome}
            </h3>
          </div>
          <StatusChip variant={status.toLowerCase() as "ativo" | "encerrado"}>
            {status}
          </StatusChip>
        </div>
        
        <div className="space-y-2">
          <div>
            <span className="text-sm font-ubuntu font-medium text-muted-foreground">Cliente:</span>
            <span className="text-sm font-ubuntu text-foreground ml-2">{cliente}</span>
          </div>
          <div>
            <span className="text-sm font-ubuntu font-medium text-muted-foreground">Empresa:</span>
            <span className="text-sm font-ubuntu text-foreground ml-2">{empresa}</span>
          </div>
        </div>
      </Card>
    )
  }
)
ContractCard.displayName = "ContractCard"

export { ContractCard }