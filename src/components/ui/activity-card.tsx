import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera, Upload, Calendar } from "lucide-react"

export interface ActivityCardProps extends React.HTMLAttributes<HTMLDivElement> {
  wbs: string
  descricao: string
  tarefa: string
  dataProgramacao: string
  percentualExecucao: number
  concluida: boolean
  dataExecucao: string
  responsavel: string
  evidencias: string[]
  onToggle?: (checked: boolean) => void
  onDateChange?: (date: string) => void
  onResponsibleChange?: (responsavel: string) => void
  onTakePhoto?: () => void
  onUploadFile?: () => void
}

const ActivityCard = React.forwardRef<HTMLDivElement, ActivityCardProps>(
  ({ 
    className,
    wbs,
    descricao,
    tarefa,
    dataProgramacao,
    percentualExecucao,
    concluida,
    dataExecucao,
    responsavel,
    evidencias,
    onToggle,
    onDateChange,
    onResponsibleChange,
    onTakePhoto,
    onUploadFile,
    ...props 
  }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn("p-4", className)}
        {...props}
      >
        <div className="space-y-4">
          {/* Cabeçalho da Atividade */}
          <div className="flex items-start gap-3">
            <Checkbox
              checked={concluida}
              onCheckedChange={onToggle}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-bold font-ubuntu text-primary">
                  WBS: {wbs}
                </span>
                <span className="text-sm font-medium font-ubuntu text-success">
                  {percentualExecucao}%
                </span>
              </div>
              <h3 className="font-medium font-ubuntu text-foreground mb-1">
                {descricao}
              </h3>
              <p className="text-sm font-ubuntu text-muted-foreground mb-2">
                <strong>Tarefa:</strong> {tarefa}
              </p>
              <p className="text-sm font-ubuntu text-muted-foreground">
                <strong>Programado para:</strong> {dataProgramacao}
              </p>
            </div>
          </div>

          {/* Controles de Execução (visíveis quando marcado) */}
          {concluida && (
            <div className="space-y-3 bg-muted/30 p-3 rounded-lg">
              {/* Data de Execução */}
              <div>
                <label className="text-sm font-medium font-ubuntu text-foreground mb-2 block">
                  Data de Execução
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="date"
                    value={dataExecucao}
                    onChange={(e) => onDateChange?.(e.target.value)}
                    className="pl-10 font-ubuntu"
                  />
                </div>
              </div>

              {/* Responsável pelo Avanço */}
              <div>
                <label className="text-sm font-medium font-ubuntu text-foreground mb-2 block">
                  Responsável pelo Avanço
                </label>
                <Input
                  placeholder="Nome do responsável"
                  value={responsavel}
                  onChange={(e) => onResponsibleChange?.(e.target.value)}
                  className="font-ubuntu"
                />
              </div>

              {/* Anexar Evidências */}
              <div>
                <label className="text-sm font-medium font-ubuntu text-foreground mb-2 block">
                  Evidências ({evidencias.length})
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onTakePhoto}
                    className="flex-1"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Foto
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onUploadFile}
                    className="flex-1"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Arquivo
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    )
  }
)
ActivityCard.displayName = "ActivityCard"

export { ActivityCard }