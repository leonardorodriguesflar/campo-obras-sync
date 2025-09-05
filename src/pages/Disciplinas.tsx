import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { OdebrechtLogo } from "@/components/odebrecht-logo"
import { ConnectionStatus } from "@/components/ui/connection-status"
import { ArrowLeft, User, Save, RefreshCw } from "lucide-react"

const Disciplinas = () => {
  const navigate = useNavigate()
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("")
  const [isOnline] = useState(true)

  const disciplinas = [
    { id: "arquitetura", nome: "ARQUITETURA" },
    { id: "civil", nome: "CIVIL" },
    { id: "duto", nome: "DUTO" },
    { id: "eletrica", nome: "ELÉTRICA" },
    { id: "e-mecanicos", nome: "E. MECÂNICOS" },
    { id: "e-estaticos", nome: "E. ESTÁTICOS" },
    { id: "instrumentacao", nome: "INSTRUMENTAÇÃO" },
    { id: "tubulacao", nome: "TUBULAÇÃO" }
  ]

  const handleDisciplineSelect = (disciplinaId: string) => {
    setSelectedDiscipline(disciplinaId)
    localStorage.setItem('selectedDiscipline', disciplinaId)
    navigate("/folhas-servico")
  }

  const handleSave = () => {
    console.log("Salvando dados localmente...")
  }

  const handleSync = () => {
    console.log("Sincronizando dados...")
  }

  return (
    <div className="min-h-screen bg-background font-ubuntu">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/modulos")}
              className="p-2 hover:bg-muted rounded-lg transition-smooth"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <OdebrechtLogo variant="compact" />
          </div>
          <div className="flex items-center gap-3">
            <ConnectionStatus 
              isOnline={isOnline}
              lastSync="há 30s"
              onSync={handleSync}
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
            {selectedDiscipline ? 
              disciplinas.find(d => d.id === selectedDiscipline)?.nome : 
              "Selecione uma Disciplina"
            }
          </p>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="p-4 space-y-6">
        <div className="text-center">
          <h2 className="text-lg font-bold font-ubuntu text-foreground mb-2">
            Disciplinas Disponíveis
          </h2>
          <p className="text-muted-foreground font-ubuntu text-sm">
            Escolha a disciplina para filtrar as folhas de serviço
          </p>
        </div>

        {/* Grid de Disciplinas */}
        <div className="grid grid-cols-2 gap-3">
          {disciplinas.map((disciplina) => (
            <Button
              key={disciplina.id}
              variant="discipline"
              className="h-16 text-center flex-col p-3"
              onClick={() => handleDisciplineSelect(disciplina.id)}
            >
              <span className="text-sm font-bold leading-tight">
                {disciplina.nome}
              </span>
            </Button>
          ))}
        </div>

        {/* Ações de Controle */}
        <div className="fixed bottom-6 left-4 right-4 flex justify-center gap-4">
          <Button
            onClick={handleSave}
            variant="success"
            size="lg"
            className="flex-1 max-w-32"
          >
            <Save className="w-4 h-4 mr-2" />
            SALVAR
          </Button>
          
          <Button
            onClick={handleSync}
            variant="odebrecht"
            size="lg"
            className="flex-1 max-w-40"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            SINCRONIZAR
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Disciplinas