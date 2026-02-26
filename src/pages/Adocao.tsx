import { useEffect, useState } from "react";
import { Heart, PawPrint } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Animal {
  id: string;
  nome: string;
  especie: string;
  sexo: string;
  idade: string;
  descricao: string | null;
  foto_url: string | null;
  status: string;
}

const Adocao = () => {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("animais")
        .select("*")
        .eq("status", "disponivel")
        .order("created_at", { ascending: false });
      if (data) setAnimais(data as Animal[]);
      setLoading(false);
    };
    fetch();
  }, []);

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
              <Card key={animal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-accent flex items-center justify-center overflow-hidden">
                  {animal.foto_url ? (
                    <img
                      src={animal.foto_url}
                      alt={`Foto de ${animal.nome}`}
                      className="w-full h-full object-cover"
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
                  <p className="text-sm text-muted-foreground mb-3">{animal.descricao}</p>
                  <Button className="w-full font-bold" size="sm">
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
    </>
  );
};

export default Adocao;
