import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OdebrechtLogo } from "@/components/odebrecht-logo"
import { ConnectionStatus } from "@/components/ui/connection-status"
import { ServiceSheetCard } from "@/components/ui/service-sheet-card"
import { ArrowLeft, User, Search, Filter, SortAsc } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const FolhasServico = () => {
  const navigate = useNavigate()
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isOnline] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [showSort, setShowSort] = useState(false)

  // Estados dos filtros
  const [filters, setFilters] = useState({
    criterioMedicao: "",
    subcontrato: "", 
    unidadeProcesso: "",
    dataInicio: "",
    dataFim: ""
  })

  const [sortBy, setSortBy] = useState("")

  useEffect(() => {
    const discipline = localStorage.getItem('selectedDiscipline')
    if (discipline) {
      setSelectedDiscipline(discipline)
    }
  }, [])

  // Dados mockados de folhas de serviço
  const folhasServico = [
    {
      numero: "FS001",
      descricao: "Instalação de estruturas metálicas do pavilhão principal",
      criterioMedicao: "Tonelada",
      subcontrato: "SUB-001",
      unidadeProcesso: "Unidade de Destilação",
      situacao: "Em Andamento" as const,
      percentualAvanco: 45
    },
    {
      numero: "FS002", 
      descricao: "Montagem de tubulações de processo - Linha 100",
      criterioMedicao: "Metro Linear",
      subcontrato: "SUB-002",
      unidadeProcesso: "Casa de Bombas",
      situacao: "Aberta" as const,
      percentualAvanco: 0
    },
    {
      numero: "FS003",
      descricao: "Instalação elétrica - Quadros de distribuição",
      criterioMedicao: "Unidade", 
      subcontrato: "SUB-003",
      unidadeProcesso: "Subestação",
      situacao: "Concluída" as const,
      percentualAvanco: 100
    },
    {
      numero: "FS004",
      descricao: "Concretagem de fundações - Blocos F1 a F10",
      criterioMedicao: "Metro Cúbico",
      subcontrato: "SUB-001", 
      unidadeProcesso: "Fundações",
      situacao: "Em Andamento" as const,
      percentualAvanco: 75
    }
  ]

  const disciplinaNome = {
    arquitetura: "ARQUITETURA",
    civil: "CIVIL", 
    duto: "DUTO",
    eletrica: "ELÉTRICA",
    "e-mecanicos": "E. MECÂNICOS",
    "e-estaticos": "E. ESTÁTICOS",
    instrumentacao: "INSTRUMENTAÇÃO",
    tubulacao: "TUBULAÇÃO"
  }[selectedDiscipline] || "TODAS"

  const filteredFolhas = folhasServico.filter(folha =>
    folha.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
    folha.numero.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleFolhaSelect = (folha: any) => {
    localStorage.setItem('selectedFolhaServico', JSON.stringify(folha))
    navigate("/detalhamento")
  }

  return (
    <div className="min-h-screen bg-background font-ubuntu pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/disciplinas")}
              className="p-2 hover:bg-muted rounded-lg transition-smooth"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <OdebrechtLogo variant="compact" />
          </div>
          <div className="flex items-center gap-3">
            <ConnectionStatus 
              isOnline={isOnline}
              lastSync="há 15s"
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
            {disciplinaNome}
          </p>
        </div>
      </div>

      {/* Controles de Busca e Filtro */}
      <div className="p-4 space-y-3 border-b border-border bg-card">
        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Pesquisar folhas de serviço..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 font-ubuntu"
          />
        </div>

        {/* Botões de Filtro e Ordenação */}
        <div className="flex gap-2">
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button variant="filter" size="sm" className="flex-1">
                <Filter className="w-4 h-4 mr-2" />
                FILTROS
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Critério de Medição</label>
                  <Select value={filters.criterioMedicao} onValueChange={(value) => setFilters(prev => ({ ...prev, criterioMedicao: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tonelada">Tonelada</SelectItem>
                      <SelectItem value="metro-linear">Metro Linear</SelectItem>
                      <SelectItem value="unidade">Unidade</SelectItem>
                      <SelectItem value="metro-cubico">Metro Cúbico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Subcontrato</label>
                  <Select value={filters.subcontrato} onValueChange={(value) => setFilters(prev => ({ ...prev, subcontrato: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SUB-001">SUB-001</SelectItem>
                      <SelectItem value="SUB-002">SUB-002</SelectItem>
                      <SelectItem value="SUB-003">SUB-003</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Unidade de Processo</label>
                  <Select value={filters.unidadeProcesso} onValueChange={(value) => setFilters(prev => ({ ...prev, unidadeProcesso: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="destilacao">Unidade de Destilação</SelectItem>
                      <SelectItem value="casa-bombas">Casa de Bombas</SelectItem>
                      <SelectItem value="subestacao">Subestação</SelectItem>
                      <SelectItem value="fundacoes">Fundações</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet open={showSort} onOpenChange={setShowSort}>
            <SheetTrigger asChild>
              <Button variant="filter" size="sm" className="flex-1">
                <SortAsc className="w-4 h-4 mr-2" />
                ORDENAR
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[50vh]">
              <SheetHeader>
                <SheetTitle>Ordenar por</SheetTitle>
              </SheetHeader>
              <div className="space-y-3 pt-4">
                <Button 
                  variant={sortBy === "data" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSortBy("data")}
                >
                  Data de Programação
                </Button>
                <Button 
                  variant={sortBy === "descricao" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSortBy("descricao")}
                >
                  Descrição
                </Button>
                <Button 
                  variant={sortBy === "numero" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSortBy("numero")}
                >
                  Número da FS
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Lista de Folhas de Serviço */}
      <div className="p-4 space-y-3">
        {filteredFolhas.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-ubuntu">
              Nenhuma folha de serviço encontrada
            </p>
          </div>
        ) : (
          filteredFolhas.map((folha) => (
            <ServiceSheetCard
              key={folha.numero}
              numero={folha.numero}
              descricao={folha.descricao}
              criterioMedicao={folha.criterioMedicao}
              subcontrato={folha.subcontrato}
              unidadeProcesso={folha.unidadeProcesso}
              situacao={folha.situacao}
              percentualAvanco={folha.percentualAvanco}
              onSelect={() => handleFolhaSelect(folha)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default FolhasServico