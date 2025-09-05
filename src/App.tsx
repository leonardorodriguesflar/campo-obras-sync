import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas
import Login from "./pages/Login";
import Contratos from "./pages/Contratos";
import Modulos from "./pages/Modulos";
import Disciplinas from "./pages/Disciplinas";
import FolhasServico from "./pages/FolhasServico";
import DetalhamentoFS from "./pages/DetalhamentoFS";
import Comissionamento from "./pages/Comissionamento";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/contratos" element={<Contratos />} />
          <Route path="/modulos" element={<Modulos />} />
          <Route path="/disciplinas" element={<Disciplinas />} />
          <Route path="/folhas-servico" element={<FolhasServico />} />
          <Route path="/detalhamento" element={<DetalhamentoFS />} />
          <Route path="/comissionamento" element={<Comissionamento />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
