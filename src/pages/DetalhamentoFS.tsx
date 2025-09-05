import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { OdebrechtLogo } from "@/components/odebrecht-logo"
import { ConnectionStatus } from "@/components/ui/connection-status"
import { ProgressBar } from "@/components/ui/progress-bar"
import { ArrowLeft, User, Camera, Upload, Calendar } from "lucide-react"
import { toast } from "sonner"

const DetalhamentoFS = () => {
  const navigate = useNavigate()
  const [folhaServico, setFolhaServico] = useState<any>(null)
  const [isOnline] = useState(true)
  const [activities, setActivities] = useState([
    {
      id: 1,
      wbs: "1.1.1",
      descricao: "Montagem de estrutura metálica - Pórtico A1-A5",
      tarefa: "Soldagem de conectores",
      dataProgramacao: "2024-01-15",
      percentualExecucao: 45,
      concluida: false,
      dataExecucao: "",
      responsavel: "",
      evidencias: []
    },
    {
      id: 2,
      wbs: "1.1.2", 
      descricao: "Montagem de estrutura metálica - Pórtico B1-B5",
      tarefa: "Posicionamento de vigas",
      dataProgramacao: "2024-01-16",
      percentualExecucao: 0,
      concluida: false,
      dataExecucao: "",
      responsavel: "",
      evidencias: []
    },
    {
      id: 3,
      wbs: "1.1.3",
      descricao: "Fixação de contraventamentos horizontais",
      tarefa: "Instalação de tirantes",
      dataProgramacao: "2024-01-17", 
      percentualExecucao: 100,
      concluida: true,
      dataExecucao: "2024-01-17",
      responsavel: "João Silva",
      evidencias: ["foto_tirantes_01.jpg"]
    }
  ])

  useEffect(() => {
    const folha = localStorage.getItem('selectedFolhaServico')
    if (folha) {
      setFolhaServico(JSON.parse(folha))
    } else {
      navigate("/folhas-servico")
    }
  }, [navigate])

  const handleActivityToggle = (activityId: number, checked: boolean) => {
    setActivities(prev => prev.map(activity => {
      if (activity.id === activityId) {
        return {
          ...activity,
          concluida: checked,
          percentualExecucao: checked ? 100 : 0,
          dataExecucao: checked ? new Date().toISOString().split('T')[0] : ""
        }
      }
      return activity
    }))
    
    if (checked) {
      toast.success("Atividade marcada como concluída!")
    }
  }

  const handleDateChange = (activityId: number, date: string) => {
    setActivities(prev => prev.map(activity => 
      activity.id === activityId ? { ...activity, dataExecucao: date } : activity
    ))
  }

  const handleResponsibleChange = (activityId: number, responsavel: string) => {
    setActivities(prev => prev.map(activity => 
      activity.id === activityId ? { ...activity, responsavel } : activity
    ))
  }

  const handleTakePhoto = (activityId: number) => {
    // Simular captura de foto
    toast.success("Foto capturada com sucesso!")
    setActivities(prev => prev.map(activity => {
      if (activity.id === activityId) {
        const newEvidences = [...activity.evidencias, `foto_${Date.now()}.jpg`]
        return { ...activity, evidencias: newEvidences }
      }
      return activity
    }))
  }

  const handleUploadFile = (activityId: number) => {
    // Simular upload de arquivo
    toast.success("Arquivo anexado com sucesso!")
    setActivities(prev => prev.map(activity => {
      if (activity.id === activityId) {
        const newEvidences = [...activity.evidencias, `arquivo_${Date.now()}.pdf`]
        return { ...activity, evidencias: newEvidences }
      }
      return activity
    }))
  }

  const calculateOverallProgress = () => {
    if (activities.length === 0) return 0
    const totalProgress = activities.reduce((sum, activity) => sum + activity.percentualExecucao, 0)
    return Math.round(totalProgress / activities.length)
  }

  if (!folhaServico) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <div className="min-h-screen bg-background font-ubuntu pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/folhas-servico")}
              className="p-2 hover:bg-muted rounded-lg transition-smooth"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <OdebrechtLogo variant="compact" />
          </div>
          <div className="flex items-center gap-3">
            <ConnectionStatus 
              isOnline={isOnline}
              lastSync="há 5s"
            />
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Título da Seção */}
      <div className="bg-primary border-b border-border px-4 py-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-primary-foreground font-ubuntu">
            FOLHAS DE SERVIÇO
          </h1>
          <p className="text-primary-foreground/80 text-sm font-ubuntu">
            FS #{folhaServico.numero}
          </p>
        </div>
      </div>

      {/* Informações da FS */}
      <Card className="m-4 p-4">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">WBS:</span>
              <div className="font-ubuntu text-foreground">1.1</div>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Sigla:</span>
              <div className="font-ubuntu text-foreground">EST-MET</div>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Data Programada:</span>
              <div className="font-ubuntu text-foreground">15/01/2024</div>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Avanço Programado:</span>
              <div className="font-ubuntu text-foreground">{calculateOverallProgress()}%</div>
            </div>
          </div>
          
          <ProgressBar value={calculateOverallProgress()} showLabel={true} />
        </div>
      </Card>

      {/* Lista de Atividades */}
      <div className="px-4 space-y-3">
        <h2 className="text-lg font-bold font-ubuntu text-foreground">
          Atividades da Folha de Serviço
        </h2>
        
        {activities.map((activity) => (
          <Card key={activity.id} className="p-4">
            <div className="space-y-4">
              {/* Cabeçalho da Atividade */}
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={activity.concluida}
                  onCheckedChange={(checked) => handleActivityToggle(activity.id, checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-bold text-primary">
                      WBS: {activity.wbs}
                    </span>
                    <span className="text-sm font-medium text-success">
                      {activity.percentualExecucao}%
                    </span>
                  </div>
                  <h3 className="font-medium text-foreground mb-1">
                    {activity.descricao}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Tarefa:</strong> {activity.tarefa}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Programado para:</strong> {activity.dataProgramacao}
                  </p>
                </div>
              </div>

              {/* Controles de Execução (visíveis quando marcado) */}
              {activity.concluida && (
                <div className="space-y-3 bg-muted/30 p-3 rounded-lg">
                  {/* Data de Execução */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Data de Execução
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        type="date"
                        value={activity.dataExecucao}
                        onChange={(e) => handleDateChange(activity.id, e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Responsável pelo Avanço */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Responsável pelo Avanço
                    </label>
                    <Input
                      placeholder="Nome do responsável"
                      value={activity.responsavel}
                      onChange={(e) => handleResponsibleChange(activity.id, e.target.value)}
                    />
                  </div>

                  {/* Anexar Evidências */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Evidências ({activity.evidencias.length})
                    </label>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTakePhoto(activity.id)}
                        className="flex-1"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Foto
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUploadFile(activity.id)}
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
        ))}
      </div>
    </div>
  )
}

export default DetalhamentoFS