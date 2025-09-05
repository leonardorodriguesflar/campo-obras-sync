import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { OdebrechtLogo } from "@/components/odebrecht-logo"
import { ConnectionStatus } from "@/components/ui/connection-status"
import { ArrowLeft, User, Calendar, Settings, CheckSquare } from "lucide-react"

const Modulos = () => {
  const navigate = useNavigate()
  const [selectedContract, setSelectedContract] = useState<any>(null)
  const [isOnline] = useState(true)

  useEffect(() => {
    // Carregar contrato selecionado
    const contract = localStorage.getItem('selectedContract')
    if (contract) {
      setSelectedContract(JSON.parse(contract))
    } else {
      navigate("/contratos")
    }
  }, [navigate])

  const modulos = [
    {
      id: "programacao",
      nome: "PROGRAMAÇÃO",
      icon: Calendar,
      description: "Folhas de Serviço e Controle de Avanço"
    },
    {
      id: "comissionamento", 
      nome: "COMISSIONAMENTO",
      icon: Settings,
      description: "Testes e Validações de Sistemas"
    },
    {
      id: "liberacoes",
      nome: "LIBERAÇÕES DE SERVIÇO", 
      icon: CheckSquare,
      description: "Aprovações e Autorizações"
    }
  ]

  const handleModuleSelect = (moduloId: string) => {
    if (moduloId === "programacao") {
      navigate("/disciplinas")
    } else {
      // Para os outros módulos, mostrar em breve
      alert(`Módulo ${moduloId} em desenvolvimento`)
    }
  }

  if (!selectedContract) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <div className="min-h-screen bg-background font-ubuntu">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/contratos")}
              className="p-2 hover:bg-muted rounded-lg transition-smooth"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <OdebrechtLogo variant="compact" />
          </div>
          <div className="flex items-center gap-3">
            <ConnectionStatus 
              isOnline={isOnline}
              lastSync="há 1 min"
              onSync={() => console.log("Sincronizando...")}
            />
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Informações do Contrato */}
      <div className="bg-primary/5 border-b border-border px-4 py-3">
        <div className="text-center">
          <h2 className="font-bold text-primary font-ubuntu">
            {selectedContract.codigo}
          </h2>
          <p className="text-sm text-muted-foreground font-ubuntu">
            {selectedContract.nome}
          </p>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="p-4 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-ubuntu text-foreground mb-2">
            Selecione um Módulo
          </h1>
          <p className="text-muted-foreground font-ubuntu">
            Escolha o módulo para começar o trabalho
          </p>
        </div>

        {/* Módulos */}
        <div className="space-y-4 max-w-md mx-auto">
          {modulos.map((modulo) => {
            const Icon = modulo.icon
            return (
              <Button
                key={modulo.id}
                variant="module"
                size="module"
                className="w-full justify-start text-left"
                onClick={() => handleModuleSelect(modulo.id)}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg text-foreground">
                      {modulo.nome}
                    </div>
                    <div className="text-sm text-muted-foreground font-normal">
                      {modulo.description}
                    </div>
                  </div>
                </div>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Modulos