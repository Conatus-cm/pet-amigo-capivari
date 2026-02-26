import { Heart, PawPrint } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Placeholder data - will be replaced with Supabase data
const animaisPlaceholder = [
  { id: "1", nome: "Caramelo", especie: "Cachorro", sexo: "Macho", idade: "2 anos", descricao: "Dócil e brincalhão, adora passear.", foto_url: "" },
  { id: "2", nome: "Mimi", especie: "Gato", sexo: "Fêmea", idade: "1 ano", descricao: "Carinhosa e calma, ideal para apartamento.", foto_url: "" },
  { id: "3", nome: "Thor", especie: "Cachorro", sexo: "Macho", idade: "3 anos", descricao: "Protetor e leal, ótimo companheiro.", foto_url: "" },
  { id: "4", nome: "Luna", especie: "Gato", sexo: "Fêmea", idade: "6 meses", descricao: "Filhote curiosa e cheia de energia.", foto_url: "" },
];

const Adocao = () => {
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {animaisPlaceholder.map((animal) => (
            <Card key={animal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-accent flex items-center justify-center">
                <PawPrint className="h-16 w-16 text-muted-foreground/30" />
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
        </div>
      </section>
    </>
  );
};

export default Adocao;
