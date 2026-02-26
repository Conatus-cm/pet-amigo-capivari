import { useState } from "react";
import { ShieldAlert, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Denuncia = () => {
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const { error } = await supabase.from("denuncias").insert({
      nome: (formData.get("nome") as string) || null,
      telefone: formData.get("telefone") as string,
      endereco: formData.get("endereco") as string,
      descricao: formData.get("descricao") as string,
    });

    setLoading(false);
    if (error) {
      toast({ title: "Erro ao enviar denúncia", description: error.message, variant: "destructive" });
      return;
    }
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="container py-20 text-center">
        <CheckCircle className="h-16 w-16 text-secondary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Denúncia Enviada!</h2>
        <p className="text-muted-foreground mb-6">
          Sua denúncia foi registrada com sucesso. O CCZ irá analisar o caso.
        </p>
        <Button onClick={() => setEnviado(false)}>Enviar Nova Denúncia</Button>
      </div>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-destructive/10 to-background py-12">
        <div className="container text-center">
          <ShieldAlert className="h-10 w-10 text-destructive mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Denunciar Maus-Tratos</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Preencha o formulário abaixo para denunciar situações de maus-tratos a animais. Sua identidade pode ser mantida em sigilo.
          </p>
        </div>
      </section>

      <section className="container py-12 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Formulário de Denúncia</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome (opcional)</Label>
                <Input id="nome" name="nome" placeholder="Seu nome" />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" name="telefone" placeholder="(19) 99999-9999" required />
              </div>
              <div>
                <Label htmlFor="endereco">Endereço da Ocorrência</Label>
                <Input id="endereco" name="endereco" placeholder="Rua, número, bairro" required />
              </div>
              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea id="descricao" name="descricao" placeholder="Descreva a situação..." rows={5} required />
              </div>
              <div>
                <Label htmlFor="imagem">Imagem (evidência)</Label>
                <Input id="imagem" type="file" accept="image/*" />
              </div>
              <Button type="submit" className="w-full font-bold" size="lg" disabled={loading}>
                {loading ? "Enviando..." : "Enviar Denúncia"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default Denuncia;
