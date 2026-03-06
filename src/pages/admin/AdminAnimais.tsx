import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Dog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Animal {
  id: string;
  nome: string;
  idade: string;
  sexo: string;
  especie: string;
  descricao: string | null;
  foto_url: string | null;
  status: string;
  created_at: string;
}

const emptyAnimal = { nome: "", idade: "", sexo: "Macho", especie: "Cachorro", raca: "", porte: "", personalidade: "", descricao: "", foto_url: "", status: "disponivel" };

const AdminAnimais = () => {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [form, setForm] = useState(emptyAnimal);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const fetchAnimais = async () => {
    const { data } = await supabase.from("animais").select("*").order("created_at", { ascending: false });
    if (data) setAnimais(data as Animal[]);
  };

  useEffect(() => { fetchAnimais(); }, []);

  const handleSave = async () => {
    if (editId) {
      await supabase.from("animais").update(form).eq("id", editId);
      toast({ title: "Animal atualizado!" });
    } else {
      await supabase.from("animais").insert(form);
      toast({ title: "Animal cadastrado!" });
    }
    setForm(emptyAnimal);
    setEditId(null);
    setOpen(false);
    fetchAnimais();
  };

  const handleEdit = (animal: Animal) => {
    setForm({ nome: animal.nome, idade: animal.idade, sexo: animal.sexo, especie: animal.especie, raca: (animal as any).raca || "", porte: (animal as any).porte || "", personalidade: (animal as any).personalidade || "", descricao: animal.descricao || "", foto_url: animal.foto_url || "", status: animal.status });
    setEditId(animal.id);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("animais").delete().eq("id", id);
    toast({ title: "Animal removido!" });
    fetchAnimais();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Dog className="h-6 w-6" /> Gerenciar Animais</h1>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setForm(emptyAnimal); setEditId(null); } }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-1 h-4 w-4" /> Novo Animal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editId ? "Editar Animal" : "Novo Animal"}</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Nome</Label><Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Espécie</Label>
                  <Select value={form.especie} onValueChange={(v) => setForm({ ...form, especie: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Cachorro">Cachorro</SelectItem><SelectItem value="Gato">Gato</SelectItem></SelectContent>
                  </Select>
                </div>
                <div><Label>Sexo</Label>
                  <Select value={form.sexo} onValueChange={(v) => setForm({ ...form, sexo: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Macho">Macho</SelectItem><SelectItem value="Fêmea">Fêmea</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>Raça</Label><Input value={form.raca} onChange={(e) => setForm({ ...form, raca: e.target.value })} placeholder="Ex: Labrador, SRD" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Idade</Label><Input value={form.idade} onChange={(e) => setForm({ ...form, idade: e.target.value })} placeholder="Ex: 2 anos" required /></div>
                <div><Label>Porte</Label>
                  <Select value={form.porte} onValueChange={(v) => setForm({ ...form, porte: v })}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pequeno">Pequeno</SelectItem>
                      <SelectItem value="Médio">Médio</SelectItem>
                      <SelectItem value="Grande">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>Personalidade</Label><Input value={form.personalidade} onChange={(e) => setForm({ ...form, personalidade: e.target.value })} placeholder="Ex: Dócil, brincalhão" /></div>
              <div><Label>Descrição</Label><Textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={3} /></div>
              <div><Label>URL da Foto</Label><Input value={form.foto_url} onChange={(e) => setForm({ ...form, foto_url: e.target.value })} placeholder="https://..." /></div>
              <div><Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="disponivel">Disponível</SelectItem><SelectItem value="adotado">Adotado</SelectItem></SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={handleSave}>{editId ? "Salvar Alterações" : "Cadastrar"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Espécie</TableHead>
              <TableHead>Sexo</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {animais.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-semibold">{a.nome}</TableCell>
                <TableCell>{a.especie}</TableCell>
                <TableCell>{a.sexo}</TableCell>
                <TableCell>{a.idade}</TableCell>
                <TableCell>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${a.status === "disponivel" ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"}`}>
                    {a.status === "disponivel" ? "Disponível" : "Adotado"}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(a)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(a.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {animais.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Nenhum animal cadastrado.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminAnimais;
