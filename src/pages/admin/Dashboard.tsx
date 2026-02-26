import { useEffect, useState } from "react";
import { Dog, ShieldAlert, Search, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [stats, setStats] = useState({ animais: 0, denuncias: 0, perdidos: 0, interesses: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [a, d, p, i] = await Promise.all([
        supabase.from("animais").select("id", { count: "exact", head: true }),
        supabase.from("denuncias").select("id", { count: "exact", head: true }).eq("status", "pendente"),
        supabase.from("animais_perdidos").select("id", { count: "exact", head: true }).eq("status", "perdido"),
        supabase.from("interesses_adocao").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        animais: a.count ?? 0,
        denuncias: d.count ?? 0,
        perdidos: p.count ?? 0,
        interesses: i.count ?? 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Animais Cadastrados", value: stats.animais, icon: Dog, color: "text-primary", bg: "bg-primary/10" },
    { label: "Denúncias Pendentes", value: stats.denuncias, icon: ShieldAlert, color: "text-destructive", bg: "bg-destructive/10" },
    { label: "Animais Perdidos", value: stats.perdidos, icon: Search, color: "text-secondary", bg: "bg-secondary/10" },
    { label: "Interesses de Adoção", value: stats.interesses, icon: Heart, color: "text-primary", bg: "bg-primary/10" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${card.bg}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-sm text-muted-foreground">{card.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
