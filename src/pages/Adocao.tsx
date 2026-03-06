import { useEffect, useState } from "react";
import { Heart, PawPrint, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Animal {
  id: string;
  nome: string;
  especie: string;
  sexo: string;
  idade: string;
  raca: string;
  porte: string;
  personalidade: string;
  descricao: string | null;
  foto_url: string | null;
  status: string;
}

const Adocao = () => {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Animal | null>(null);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAnimais = async () => {
      const { data } = await supabase
        .from("animais")
        .select("*")
        .eq("status", "disponivel")
        .order("created_at", { ascending: false });
      if (data) setAnimais(data as Animal[]);
      setLoading(false);
    };
    fetchAnimais();
  }, []);

  const handleInterestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const { error } = await supabase.from("interesses_adocao").insert({
      animal_id: selected.id,
      nome: formData.get("nome") as string,
      email: formData.get("email") as string,
      telefone: formData.get("telefone") as string,
    });

    setSubmitting(false);
    if (error) {
      toast({ title: "Erro ao enviar interesse", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Interesse enviado! 🐾", description: "Entraremos em contato em breve." });
    setShowInterestForm(false);
    form.reset();
  };

  // Detail view for a selected animal
  if (selected && !showInterestForm) {
    return (
      <>
        <section className="bg-gradient-to-br from-primary/10 to-background py-8">
          <div className="container">
            <Button variant="ghost" onClick={() => setSelected(null)} className="mb-4 gap-2">
              <ArrowLeft className="h-4 w-4" /> Voltar
            </Button>
          </div>
        </section>
        <section className="container py-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="aspect-square rounded-2xl bg-accent flex items-center justify-center overflow-hidden">
              {selected.foto_url ? (
                <img
                  src={selected.foto_url}
                  alt={`Foto de ${selected.nome}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <PawPrint className="h-24 w-24 text-muted-foreground/30" />
              )}
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-3xl font-extrabold">{selected.nome}</h1>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">{selected.especie}</Badge>
                <Badge variant="secondary">{selected.sexo}</Badge>
                <Badge variant="outline">{selected.idade}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {selected.raca && (
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground font-semibold">Raça</p>
                    <p className="font-bold text-sm">{selected.raca}</p>
                  </div>
                )}
                {selected.porte && (
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground font-semibold">Porte</p>
                    <p className="font-bold text-sm">{selected.porte}</p>
                  </div>
                )}
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground font-semibold">Idade</p>
                  <p className="font-bold text-sm">{selected.idade}</p>
                </div>
                {selected.personalidade && (
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground font-semibold">Personalidade</p>
                    <p className="font-bold text-sm">{selected.personalidade}</p>
                  </div>
                )}
              </div>
              {selected.descricao && (
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Sobre</h3>
                  <p className="text-foreground leading-relaxed">{selected.descricao}</p>
                </div>
              )}
              <Button
                size="lg"
                className="w-full md:w-auto font-bold mt-4"
                onClick={() => setShowInterestForm(true)}
              >
                <Heart className="mr-2 h-5 w-5" /> Tenho Interesse
              </Button>
            </div>
          </div>
        </section>

        {/* Interest form dialog */}
        <Dialog open={showInterestForm} onOpenChange={setShowInterestForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Interesse em adotar {selected.nome}</DialogTitle>
              <DialogDescription>
                Preencha seus dados de contato e entraremos em contato.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInterestSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome completo</Label>
                <Input id="nome" name="nome" placeholder="Seu nome" required />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" placeholder="seu@email.com" required />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" name="telefone" placeholder="(19) 99999-9999" required />
              </div>
              <Button type="submit" className="w-full font-bold" disabled={submitting}>
                {submitting ? "Enviando..." : "Enviar Interesse"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-background py-12">
        <div className="container text-center">
          <Heart className="h-10 w-10 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Animais para Adoção</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Conheça nossos amigos que estão em busca de um lar cheio de amor.
          </p>
        </div>
      </section>

      <section className="container py-12">
        {loading ? (
          <div className="text-center py-12">
            <PawPrint className="h-10 w-10 text-primary mx-auto animate-pulse" />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {animais.map((animal) => (
              <Card
                key={animal.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => setSelected(animal)}
              >
                <div className="aspect-square bg-accent flex items-center justify-center overflow-hidden">
                  {animal.foto_url ? (
                    <img
                      src={animal.foto_url}
                      alt={`Foto de ${animal.nome}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <PawPrint className="h-16 w-16 text-muted-foreground/30" />
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg">{animal.nome}</h3>
                  <div className="flex gap-2 mt-1 mb-2 text-xs">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">{animal.especie}</span>
                    <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-semibold">{animal.sexo}</span>
                    <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{animal.idade}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{animal.descricao}</p>
                  <Button className="w-full font-bold" size="sm" onClick={(e) => { e.stopPropagation(); setSelected(animal); setShowInterestForm(true); }}>
                    <Heart className="mr-1 h-4 w-4" /> Tenho Interesse
                  </Button>
                </CardContent>
              </Card>
            ))}
            {animais.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground py-8">Nenhum animal disponível no momento.</p>
            )}
          </div>
        )}
      </section>

      {/* Interest form dialog (from grid) */}
      {selected && (
        <Dialog open={showInterestForm} onOpenChange={(open) => { setShowInterestForm(open); if (!open) setSelected(null); }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Interesse em adotar {selected.nome}</DialogTitle>
              <DialogDescription>
                Preencha seus dados de contato e entraremos em contato.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInterestSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome completo</Label>
                <Input id="nome" name="nome" placeholder="Seu nome" required />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" placeholder="seu@email.com" required />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" name="telefone" placeholder="(19) 99999-9999" required />
              </div>
              <Button type="submit" className="w-full font-bold" disabled={submitting}>
                {submitting ? "Enviando..." : "Enviar Interesse"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Adocao;
