import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OdebrechtLogo } from "@/components/odebrecht-logo"
import { Eye, EyeOff } from "lucide-react"
import constructionHero from "@/assets/construction-hero.jpg"

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    usuario: "",
    senha: "",
    bancoDados: "",
    idioma: "pt-BR"
  })

  const handleLogin = () => {
    // Simular validação básica
    if (formData.usuario && formData.senha && formData.bancoDados) {
      navigate("/contratos")
    }
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 font-ubuntu relative"
      style={{ backgroundImage: `url(${constructionHero})` }}
    >
      {/* Overlay escuro para melhorar legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/90" />
      
      {/* Conteúdo */}
      <div className="relative w-full max-w-md space-y-8 z-10">
        {/* Logo Principal */}
        <div className="text-center">
          <OdebrechtLogo variant="full" theme="white" className="justify-center mb-4" />
          <div className="text-white/80 text-sm font-medium">
            Versão 1.0.0
          </div>
        </div>

        {/* Card de Login */}
        <Card className="p-8 shadow-xl border-0">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold font-ubuntu text-foreground">
                SisEPC Mobile
              </h1>
              <p className="text-muted-foreground font-ubuntu mt-2">
                Acesse sua conta para continuar
              </p>
            </div>

            <div className="space-y-4">
              {/* Usuário */}
              <div className="space-y-2">
                <Label htmlFor="usuario" className="font-ubuntu font-medium">
                  Usuário
                </Label>
                <Input
                  id="usuario"
                  type="text"
                  value={formData.usuario}
                  onChange={(e) => setFormData(prev => ({ ...prev, usuario: e.target.value }))}
                  className="font-ubuntu"
                  placeholder="Digite seu usuário"
                />
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="senha" className="font-ubuntu font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="senha"
                    type={showPassword ? "text" : "password"}
                    value={formData.senha}
                    onChange={(e) => setFormData(prev => ({ ...prev, senha: e.target.value }))}
                    className="font-ubuntu pr-10"
                    placeholder="Digite sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Banco de Dados */}
              <div className="space-y-2">
                <Label htmlFor="bancoDados" className="font-ubuntu font-medium">
                  Banco de Dados
                </Label>
                <Select 
                  value={formData.bancoDados} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, bancoDados: value }))}
                >
                  <SelectTrigger className="font-ubuntu">
                    <SelectValue placeholder="Selecione o banco" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prod">Produção</SelectItem>
                    <SelectItem value="test">Teste</SelectItem>
                    <SelectItem value="dev">Desenvolvimento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Idioma */}
              <div className="space-y-2">
                <Label htmlFor="idioma" className="font-ubuntu font-medium">
                  Idioma
                </Label>
                <Select 
                  value={formData.idioma} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, idioma: value }))}
                >
                  <SelectTrigger className="font-ubuntu">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="es-ES">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Botão Login */}
            <Button 
              onClick={handleLogin}
              className="w-full"
              size="lg"
              variant="odebrecht"
            >
              OK
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Login