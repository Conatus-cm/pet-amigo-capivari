import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AnimalPerdido {
  id: string;
  descricao: string;
  local: string;
  telefone: string;
  imagem_url: string | null;
  status: string;
  created_at: string;
}

const AdminPerdidos = () => {
  const [perdidos, setPerdidos] = useState<AnimalPerdido[]>([]);
  const { toast } = useToast();

  const fetch = async () => {
    const { data } = await supabase.from("animais_perdidos").select("*").order("created_at", { ascending: false });
    if (data) setPerdidos(data as AnimalPerdido[]);
  };

  useEffect(() => { fetch(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("animais_perdidos").update({ status }).eq("id", id);
    toast({ title: "Status atualizado!" });
    fetch();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6"><Search className="h-6 w-6" /> Gerenciar Perdidos</h1>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {perdidos.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="text-xs whitespace-nowrap">{new Date(p.created_at).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell className="max-w-[250px] truncate">{p.descricao}</TableCell>
                <TableCell>{p.local}</TableCell>
                <TableCell>{p.telefone}</TableCell>
                <TableCell>
                  <Select value={p.status} onValueChange={(v) => updateStatus(p.id, v)}>
                    <SelectTrigger className="w-[130px] h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perdido">Perdido</SelectItem>
                      <SelectItem value="encontrado">Encontrado</SelectItem>
                      <SelectItem value="arquivado">Arquivado</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
            {perdidos.length === 0 && (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Nenhum animal perdido registrado.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPerdidos;
