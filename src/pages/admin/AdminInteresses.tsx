import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

interface Interesse {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  created_at: string;
  animais: { nome: string } | null;
}

const AdminInteresses = () => {
  const [interesses, setInteresses] = useState<Interesse[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("interesses_adocao")
        .select("*, animais(nome)")
        .order("created_at", { ascending: false });
      if (data) setInteresses(data as unknown as Interesse[]);
    };
    fetch();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6"><Heart className="h-6 w-6" /> Interesses de Adoção</h1>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Animal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interesses.map((i) => (
              <TableRow key={i.id}>
                <TableCell className="text-xs whitespace-nowrap">{new Date(i.created_at).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell className="font-semibold">{i.nome}</TableCell>
                <TableCell>{i.telefone}</TableCell>
                <TableCell>{i.email}</TableCell>
                <TableCell>{i.animais?.nome || "—"}</TableCell>
              </TableRow>
            ))}
            {interesses.length === 0 && (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Nenhum interesse registrado.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminInteresses;
