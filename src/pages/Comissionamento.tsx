import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { OdebrechtLogo } from "@/components/odebrecht-logo"
import { ConnectionStatus } from "@/components/ui/connection-status"
import { ArrowLeft, User, Settings, CheckCircle, AlertTriangle, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { StatusChip } from "@/components/ui/status-chip"
import { Input } from "@/components/ui/input"

const Comissionamento = () => {
  const navigate = useNavigate()
  const [selectedContract, setSelectedContract] = useState<any>(null)
  const [isOnline] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Carregar contrato selecionado
    const contract = localStorage.getItem('selectedContract')
    if (contract) {
      setSelectedContract(JSON.parse(contract))
    } else {
      navigate("/contratos")
    }
  }, [navigate])

  // Dados mockados para comissionamento
  const sistemas = [
    {
      id: "SIS001",
      nome: "Sistema de Ar Condicionado Central",
      disciplina: "MECÂNICA",
      status: "ativo",
      progresso: 75,
      testes: 12,
      testesCompletos: 9,
      dataPrevista: "15/12/2024"
    },
    {
      id: "SIS002", 
      nome: "Sistema Elétrico de Emergência",
      disciplina: "ELÉTRICA",
      status: "pendente",
      progresso: 45,
      testes: 8,
      testesCompletos: 3,
      dataPrevista: "20/12/2024"
    },
    {
      id: "SIS003",
      nome: "Sistema de Combate a Incêndio",
      disciplina: "HIDRÁULICA",
      status: "concluido",
      progresso: 100,
      testes: 15,
      testesCompletos: 15,
      dataPrevista: "10/12/2024"
    },
    {
      id: "SIS004",
      nome: "Sistema de Instrumentação e Controle",
      disciplina: "INSTRUMENTAÇÃO",
      status: "ativo",
      progresso: 60,
      testes: 20,
      testesCompletos: 12,
      dataPrevista: "25/12/2024"
    }
  ]

  const filteredSistemas = sistemas.filter(sistema =>
    sistema.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sistema.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sistema.disciplina.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "concluido":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "ativo":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "pendente":
        return <AlertTriangle className="w-4 h-4 text-orange-600" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "concluido":
        return "ativo" as const
      case "ativo":
        return "encerrado" as const
      case "pendente":
        return "encerrado" as const
      default:
        return "encerrado" as const
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "concluido":
        return "CONCLUÍDO"
      case "ativo":
        return "EM ANDAMENTO"
      case "pendente":
        return "PENDENTE"
      default:
        return "PENDENTE"
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

      {/* Cabeçalho da Página */}
      <div className="p-4 space-y-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Settings className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold font-ubuntu text-foreground">
              COMISSIONAMENTO
            </h1>
          </div>
          <p className="text-muted-foreground font-ubuntu">
            Testes e Validações de Sistemas
          </p>
        </div>

        {/* Campo de Busca */}
        <div className="max-w-md mx-auto">
          <Input
            placeholder="Buscar sistemas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Lista de Sistemas */}
        <div className="space-y-4">
          {filteredSistemas.map((sistema) => (
            <Card 
              key={sistema.id}
              className="p-4 cursor-pointer hover:shadow-primary transition-smooth hover:border-primary"
              onClick={() => alert(`Abrindo detalhes do sistema ${sistema.id}`)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(sistema.status)}
                  <span className="text-sm font-ubuntu font-medium text-muted-foreground">
                    {sistema.id}
                  </span>
                </div>
                <StatusChip variant={getStatusVariant(sistema.status)}>
                  {getStatusLabel(sistema.status)}
                </StatusChip>
              </div>
              
              <h3 className="font-ubuntu font-bold text-foreground text-lg leading-tight mb-3">
                {sistema.nome}
              </h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-ubuntu font-medium text-muted-foreground">
                    Disciplina:
                  </span>
                  <span className="text-sm font-ubuntu text-foreground">
                    {sistema.disciplina}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-ubuntu font-medium text-muted-foreground">
                    Testes:
                  </span>
                  <span className="text-sm font-ubuntu text-foreground">
                    {sistema.testesCompletos}/{sistema.testes}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-ubuntu font-medium text-muted-foreground">
                    Data Prevista:
                  </span>
                  <span className="text-sm font-ubuntu text-foreground">
                    {sistema.dataPrevista}
                  </span>
                </div>
              </div>

              {/* Barra de Progresso */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-ubuntu font-medium text-muted-foreground">
                    Progresso
                  </span>
                  <span className="text-sm font-ubuntu font-bold text-foreground">
                    {sistema.progresso}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${sistema.progresso}%` }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredSistemas.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground font-ubuntu">
              Nenhum sistema encontrado para "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Comissionamento