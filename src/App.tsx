import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import AdminLayout from "@/components/layout/AdminLayout";
import Index from "./pages/Index";
import Adocao from "./pages/Adocao";
import Denuncia from "./pages/Denuncia";
import Perdidos from "./pages/Perdidos";
import Contato from "./pages/Contato";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AdminAnimais from "./pages/admin/AdminAnimais";
import AdminDenuncias from "./pages/admin/AdminDenuncias";
import AdminPerdidos from "./pages/admin/AdminPerdidos";
import AdminInteresses from "./pages/admin/AdminInteresses";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/adocao" element={<Adocao />} />
            <Route path="/denuncia" element={<Denuncia />} />
            <Route path="/perdidos" element={<Perdidos />} />
            <Route path="/contato" element={<Contato />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="animais" element={<AdminAnimais />} />
            <Route path="denuncias" element={<AdminDenuncias />} />
            <Route path="perdidos" element={<AdminPerdidos />} />
            <Route path="interesses" element={<AdminInteresses />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
