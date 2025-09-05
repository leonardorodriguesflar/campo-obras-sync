import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { OdebrechtLogo } from "@/components/odebrecht-logo"
import { ContractCard } from "@/components/ui/contract-card"
import { ConnectionStatus } from "@/components/ui/connection-status"
import { Search, User } from "lucide-react"

const Contratos = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [isOnline] = useState(true)

  // Dados mockados de contratos
  const contratos = [
    {
      codigo: "CNT-001",
      nome: "Refinaria Comperj - Unidade de Destilação",
      cliente: "Petrobras",
      empresa: "Odebrecht Engenharia & Construção",
      status: "ATIVO" as const
    },
    {
      codigo: "CNT-002", 
      nome: "Porto Sul - Terminal Portuário",
      cliente: "Governo da Bahia",
      empresa: "Odebrecht Infraestrutura",
      status: "ATIVO" as const
    },
    {
      codigo: "CNT-003",
      nome: "Arena Fonte Nova - Reforma Estrutural",
      cliente: "Fonte Nova Negócios e Participações",
      empresa: "Odebrecht Realizações Imobiliárias",
      status: "ENCERRADO" as const
    }
  ]

  const filteredContratos = contratos.filter(contrato =>
    contrato.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contrato.codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contrato.cliente.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleContractSelect = (contrato: any) => {
    // Salvar contrato selecionado no localStorage
    localStorage.setItem('selectedContract', JSON.stringify(contrato))
    navigate("/modulos")
  }

  return (
    <div className="min-h-screen bg-background font-ubuntu">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex justify-between items-center">
          <OdebrechtLogo variant="compact" />
          <div className="flex items-center gap-3">
            <ConnectionStatus 
              isOnline={isOnline}
              lastSync="há 2 min"
              onSync={() => console.log("Sincronizando...")}
            />
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-ubuntu text-foreground mb-2">
            Selecione um Contrato
          </h1>
          <p className="text-muted-foreground font-ubuntu">
            Escolha o contrato ativo para iniciar o trabalho
          </p>
        </div>

        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Pesquisar contratos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 font-ubuntu"
          />
        </div>

        {/* Lista de Contratos */}
        <div className="space-y-3">
          {filteredContratos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-ubuntu">
                Nenhum contrato encontrado
              </p>
            </div>
          ) : (
            filteredContratos.map((contrato) => (
              <ContractCard
                key={contrato.codigo}
                codigo={contrato.codigo}
                nome={contrato.nome}
                cliente={contrato.cliente}
                empresa={contrato.empresa}
                status={contrato.status}
                onSelect={() => handleContractSelect(contrato)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Contratos