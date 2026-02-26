import { useState } from "react";
import { Phone, MapPin, Clock, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Contato = () => {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-background py-12">
        <div className="container text-center">
          <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Fale Conosco</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Entre em contato com o CCZ de Capivari.
          </p>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Telefone</p>
                    <p className="text-muted-foreground text-sm">(19) 3491-XXXX</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Endereço</p>
                    <p className="text-muted-foreground text-sm">Rua Exemplo, 123 — Capivari/SP</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Horário</p>
                    <p className="text-muted-foreground text-sm">Seg a Sex: 8h às 17h</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* OpenStreetMap embed */}
            <Card className="overflow-hidden">
              <iframe
                title="Localização CCZ Capivari"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-47.53%2C-22.99%2C-47.49%2C-22.96&layer=mapnik"
                className="w-full h-64 border-0"
                loading="lazy"
              />
            </Card>
          </div>

          {/* Form */}
          <div>
            {enviado ? (
              <div className="text-center py-16">
                <CheckCircle className="h-16 w-16 text-secondary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Mensagem Enviada!</h2>
                <p className="text-muted-foreground mb-6">Entraremos em contato em breve.</p>
                <Button onClick={() => setEnviado(false)}>Enviar Nova Mensagem</Button>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Enviar Mensagem</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="nome">Nome</Label>
                      <Input id="nome" placeholder="Seu nome" required />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" required />
                    </div>
                    <div>
                      <Label htmlFor="mensagem">Mensagem</Label>
                      <Textarea id="mensagem" placeholder="Escreva sua mensagem..." rows={5} required />
                    </div>
                    <Button type="submit" className="w-full font-bold" size="lg">
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contato;
