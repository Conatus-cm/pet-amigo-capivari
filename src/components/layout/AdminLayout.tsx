import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { PawPrint, LayoutDashboard, Dog, ShieldAlert, Search, Heart, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const sidebarLinks = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/animais", icon: Dog, label: "Animais" },
  { to: "/admin/denuncias", icon: ShieldAlert, label: "Denúncias" },
  { to: "/admin/perdidos", icon: Search, label: "Perdidos" },
  { to: "/admin/interesses", icon: Heart, label: "Interesses" },
];

const AdminLayout = () => {
  const { user, isAdmin, loading } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PawPrint className="h-10 w-10 text-primary animate-pulse" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-card border-r">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center gap-2 font-extrabold text-lg text-primary">
            <PawPrint className="h-6 w-6" />
            <span>CCZ Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                location.pathname === link.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent"
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Sair
          </Button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden sticky top-0 z-50 border-b bg-card p-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-extrabold text-primary">
            <PawPrint className="h-5 w-5" /> CCZ Admin
          </Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}><Menu className="h-5 w-5" /></button>
        </header>
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-background/80" onClick={() => setSidebarOpen(false)}>
            <aside className="w-64 h-full bg-card border-r p-3 space-y-1" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4 px-2">
                <span className="font-bold text-primary">Menu</span>
                <button onClick={() => setSidebarOpen(false)}><X className="h-5 w-5" /></button>
              </div>
              {sidebarLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    location.pathname === link.to ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent"
                  }`}>
                  <link.icon className="h-4 w-4" /> {link.label}
                </Link>
              ))}
              <Button variant="ghost" className="w-full justify-start text-muted-foreground mt-4" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Sair
              </Button>
            </aside>
          </div>
        )}

        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
