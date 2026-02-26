import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Denuncia {
  id: string;
  nome: string | null;
  telefone: string;
  endereco: string;
  descricao: string;
  imagem_url: string | null;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pendente: "bg-yellow-100 text-yellow-800",
  em_analise: "bg-blue-100 text-blue-800",
  resolvida: "bg-green-100 text-green-800",
  arquivada: "bg-muted text-muted-foreground",
};

const AdminDenuncias = () => {
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const { toast } = useToast();

  const fetch = async () => {
    const { data } = await supabase.from("denuncias").select("*").order("created_at", { ascending: false });
    if (data) setDenuncias(data as Denuncia[]);
  };

  useEffect(() => { fetch(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("denuncias").update({ status }).eq("id", id);
    toast({ title: "Status atualizado!" });
    fetch();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6"><ShieldAlert className="h-6 w-6" /> Gerenciar Denúncias</h1>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {denuncias.map((d) => (
              <TableRow key={d.id}>
                <TableCell className="text-xs whitespace-nowrap">{new Date(d.created_at).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell>{d.nome || "Anônimo"}</TableCell>
                <TableCell>{d.telefone}</TableCell>
                <TableCell className="max-w-[150px] truncate">{d.endereco}</TableCell>
                <TableCell className="max-w-[200px] truncate">{d.descricao}</TableCell>
                <TableCell>
                  <Select value={d.status} onValueChange={(v) => updateStatus(d.id, v)}>
                    <SelectTrigger className="w-[130px] h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="em_analise">Em Análise</SelectItem>
                      <SelectItem value="resolvida">Resolvida</SelectItem>
                      <SelectItem value="arquivada">Arquivada</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
            {denuncias.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Nenhuma denúncia registrada.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDenuncias;
