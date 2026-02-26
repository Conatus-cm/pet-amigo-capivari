import { Link } from "react-router-dom";
import { Heart, ShieldAlert, Search, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const quickActions = [
  {
    to: "/adocao",
    icon: Heart,
    title: "Adote um Amigo",
    description: "Conheça os animais disponíveis para adoção e dê um lar cheio de amor.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    to: "/denuncia",
    icon: ShieldAlert,
    title: "Denunciar Maus-Tratos",
    description: "Viu um animal em situação de maus-tratos? Denuncie de forma segura.",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    to: "/perdidos",
    icon: Search,
    title: "Animal Perdido?",
    description: "Perdeu seu animal ou encontrou um? Registre aqui e ajude a reunir famílias.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent to-background py-20 md:py-28">
        <div className="container text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-primary/15 p-4">
              <PawPrint className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Centro de Controle de Zoonoses
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Cuidando dos animais e da saúde pública de <strong>Capivari-SP</strong>. Adote, denuncie, ajude!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/adocao">
              <Button size="lg" className="font-bold">
                <Heart className="mr-2 h-5 w-5" /> Ver Animais para Adoção
              </Button>
            </Link>
            <Link to="/contato">
              <Button size="lg" variant="outline" className="font-bold">
                Fale Conosco
              </Button>
            </Link>
          </div>
        </div>
        {/* Decorative paws */}
        <PawPrint className="absolute top-10 left-10 h-24 w-24 text-primary/5 rotate-[-20deg]" />
        <PawPrint className="absolute bottom-10 right-10 h-32 w-32 text-secondary/5 rotate-[15deg]" />
      </section>

      {/* Quick Actions */}
      <section className="container py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Como podemos ajudar?
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {quickActions.map((action) => (
            <Link key={action.to} to={action.to} className="group">
              <Card className="h-full transition-shadow hover:shadow-lg border-2 border-transparent hover:border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto mb-4 w-14 h-14 rounded-full flex items-center justify-center ${action.bg}`}>
                    <action.icon className={`h-7 w-7 ${action.color}`} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-accent/50 py-16">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Sobre o CCZ</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            O Centro de Controle de Zoonoses de Capivari trabalha para garantir a saúde e o bem-estar dos animais da cidade.
            Realizamos controle de populações, campanhas de vacinação, resgate de animais em situação de risco,
            além de promover a adoção responsável. Juntos, construímos uma cidade mais humana para todos!
          </p>
        </div>
      </section>
    </>
  );
};

export default Index;
