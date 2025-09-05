import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { StatusChip } from "@/components/ui/status-chip"
import { ProgressBar } from "@/components/ui/progress-bar"

export interface ServiceSheetCardProps extends React.HTMLAttributes<HTMLDivElement> {
  numero: string
  descricao: string
  criterioMedicao: string
  subcontrato: string
  unidadeProcesso: string
  situacao: "Em Andamento" | "Concluída" | "Aberta"
  percentualAvanco: number
  onSelect?: () => void
}

const ServiceSheetCard = React.forwardRef<HTMLDivElement, ServiceSheetCardProps>(
  ({ 
    className, 
    numero, 
    descricao, 
    criterioMedicao, 
    subcontrato, 
    unidadeProcesso, 
    situacao, 
    percentualAvanco,
    onSelect,
    ...props 
  }, ref) => {
    const getStatusVariant = (situacao: string) => {
      switch (situacao) {
        case "Em Andamento": return "em-andamento"
        case "Concluída": return "concluida"
        case "Aberta": return "aberta"
        default: return "inactive"
      }
    }

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
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-ubuntu font-bold text-primary">
                FS #{numero}
              </span>
              <StatusChip variant={getStatusVariant(situacao) as any}>
                {situacao}
              </StatusChip>
            </div>
            <h3 className="font-ubuntu font-medium text-foreground text-base leading-tight mb-3">
              {descricao}
            </h3>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div>
            <span className="font-ubuntu font-medium text-muted-foreground">Critério:</span>
            <div className="font-ubuntu text-foreground">{criterioMedicao}</div>
          </div>
          <div>
            <span className="font-ubuntu font-medium text-muted-foreground">Subcontrato:</span>
            <div className="font-ubuntu text-foreground">{subcontrato}</div>
          </div>
          <div className="col-span-2">
            <span className="font-ubuntu font-medium text-muted-foreground">Unidade de Processo:</span>
            <div className="font-ubuntu text-foreground">{unidadeProcesso}</div>
          </div>
        </div>

        <ProgressBar value={percentualAvanco} showLabel={true} size="md" />
      </Card>
    )
  }
)
ServiceSheetCard.displayName = "ServiceSheetCard"

export { ServiceSheetCard }