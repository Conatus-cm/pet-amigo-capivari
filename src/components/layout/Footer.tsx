import { PawPrint, Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-extrabold text-lg text-primary mb-3">
              <PawPrint className="h-5 w-5" />
              CCZ Digital Capivari
            </div>
            <p className="text-sm text-muted-foreground">
              Centro de Controle de Zoonoses de Capivari-SP. Cuidando dos animais e da saúde pública da nossa cidade.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-3">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                (19) 3491-XXXX
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Rua Exemplo, 123 - Capivari/SP
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Seg a Sex: 8h às 17h
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/adocao" className="hover:text-primary transition-colors">Animais para Adoção</a></li>
              <li><a href="/denuncia" className="hover:text-primary transition-colors">Denunciar Maus-Tratos</a></li>
              <li><a href="/perdidos" className="hover:text-primary transition-colors">Animais Perdidos</a></li>
              <li><a href="/contato" className="hover:text-primary transition-colors">Fale Conosco</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} CCZ Digital Capivari. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
