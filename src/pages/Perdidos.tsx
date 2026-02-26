import { useState } from "react";
import { Search, PawPrint, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const perdidosPlaceholder = [
  { id: "1", descricao: "Cachorro caramelo de porte médio, coleira azul.", local: "Praça Central", telefone: "(19) 99999-0001" },
  { id: "2", descricao: "Gato preto com mancha branca no peito.", local: "Rua das Flores, 45", telefone: "(19) 99999-0002" },
];

const Perdidos = () => {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <>
      <section className="bg-gradient-to-br from-secondary/10 to-background py-12">
        <div className="container text-center">
          <Search className="h-10 w-10 text-secondary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Animais Perdidos</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Perdeu seu animal ou encontrou um? Ajude a reunir famílias.
          </p>
        </div>
      </section>

      <section className="container py-12 max-w-3xl">
        <Tabs defaultValue="lista">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="lista" className="flex-1">Animais Reportados</TabsTrigger>
            <TabsTrigger value="registrar" className="flex-1">Registrar Perdido</TabsTrigger>
          </TabsList>

          <TabsContent value="lista">
            <div className="space-y-4">
              {perdidosPlaceholder.map((animal) => (
                <Card key={animal.id}>
                  <CardContent className="flex items-start gap-4 p-4">
                    <div className="w-20 h-20 rounded-lg bg-accent flex items-center justify-center shrink-0">
                      <PawPrint className="h-8 w-8 text-muted-foreground/30" />
                    </div>
                    <div>
                      <p className="font-semibold">{animal.descricao}</p>
                      <p className="text-sm text-muted-foreground mt-1">📍 {animal.local}</p>
                      <p className="text-sm text-muted-foreground">📞 {animal.telefone}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="registrar">
            {enviado ? (
              <div className="text-center py-10">
                <CheckCircle className="h-16 w-16 text-secondary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Registro Enviado!</h2>
                <p className="text-muted-foreground mb-6">O animal foi registrado na lista de perdidos.</p>
                <Button onClick={() => setEnviado(false)}>Registrar Outro</Button>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Registrar Animal Perdido</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="descricao">Descrição do Animal</Label>
                      <Textarea id="descricao" placeholder="Cor, porte, raça..." rows={3} required />
                    </div>
                    <div>
                      <Label htmlFor="local">Local onde foi visto</Label>
                      <Input id="local" placeholder="Rua, bairro..." required />
                    </div>
                    <div>
                      <Label htmlFor="telefone">Telefone para Contato</Label>
                      <Input id="telefone" placeholder="(19) 99999-9999" required />
                    </div>
                    <div>
                      <Label htmlFor="foto">Foto do Animal</Label>
                      <Input id="foto" type="file" accept="image/*" />
                    </div>
                    <Button type="submit" className="w-full font-bold" size="lg">
                      Registrar Animal
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default Perdidos;
