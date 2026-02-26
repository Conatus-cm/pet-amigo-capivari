import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Início" },
  { to: "/adocao", label: "Adoção" },
  { to: "/denuncia", label: "Denúncia" },
  { to: "/perdidos", label: "Perdidos" },
  { to: "/contato", label: "Contato" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-xl text-primary">
          <PawPrint className="h-7 w-7" />
          <span>CCZ Digital Capivari</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors hover:bg-accent ${
                location.pathname === link.to
                  ? "text-primary bg-accent"
                  : "text-foreground/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/admin/login">
            <Button size="sm" variant="outline" className="ml-2">
              Admin
            </Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden border-t bg-card p-4 flex flex-col gap-2 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 rounded-md font-semibold transition-colors hover:bg-accent ${
                location.pathname === link.to
                  ? "text-primary bg-accent"
                  : "text-foreground/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/admin/login" onClick={() => setMenuOpen(false)}>
            <Button size="sm" variant="outline" className="w-full mt-1">
              Admin
            </Button>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
