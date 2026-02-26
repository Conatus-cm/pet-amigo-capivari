
-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create animais table
CREATE TABLE public.animais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  idade TEXT NOT NULL,
  sexo TEXT NOT NULL,
  especie TEXT NOT NULL,
  descricao TEXT,
  foto_url TEXT,
  status TEXT NOT NULL DEFAULT 'disponivel',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create denuncias table
CREATE TABLE public.denuncias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT,
  telefone TEXT NOT NULL,
  endereco TEXT NOT NULL,
  descricao TEXT NOT NULL,
  imagem_url TEXT,
  status TEXT NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create animais_perdidos table
CREATE TABLE public.animais_perdidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  descricao TEXT NOT NULL,
  local TEXT NOT NULL,
  telefone TEXT NOT NULL,
  imagem_url TEXT,
  status TEXT NOT NULL DEFAULT 'perdido',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create interesses_adocao table
CREATE TABLE public.interesses_adocao (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  animal_id UUID REFERENCES public.animais(id) ON DELETE CASCADE NOT NULL,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create contatos table
CREATE TABLE public.contatos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on all tables
ALTER TABLE public.animais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.denuncias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.animais_perdidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interesses_adocao ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contatos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for animais (public read, admin write)
CREATE POLICY "Anyone can view animais" ON public.animais FOR SELECT USING (true);
CREATE POLICY "Admins can insert animais" ON public.animais FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update animais" ON public.animais FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete animais" ON public.animais FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for denuncias (anyone can insert, admin can read/update)
CREATE POLICY "Anyone can insert denuncias" ON public.denuncias FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view denuncias" ON public.denuncias FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update denuncias" ON public.denuncias FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for animais_perdidos (public read/insert, admin update)
CREATE POLICY "Anyone can view animais_perdidos" ON public.animais_perdidos FOR SELECT USING (true);
CREATE POLICY "Anyone can insert animais_perdidos" ON public.animais_perdidos FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update animais_perdidos" ON public.animais_perdidos FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for interesses_adocao (anyone can insert, admin can read)
CREATE POLICY "Anyone can insert interesses" ON public.interesses_adocao FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view interesses" ON public.interesses_adocao FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for contatos (anyone can insert, admin can read)
CREATE POLICY "Anyone can insert contatos" ON public.contatos FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view contatos" ON public.contatos FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles (admin only)
CREATE POLICY "Admins can view roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Insert sample animals
INSERT INTO public.animais (nome, idade, sexo, especie, descricao, foto_url, status) VALUES
  ('Caramelo', '2 anos', 'Macho', 'Cachorro', 'Dócil e brincalhão, adora passear.', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop', 'disponivel'),
  ('Mimi', '1 ano', 'Fêmea', 'Gato', 'Carinhosa e calma, ideal para apartamento.', 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop', 'disponivel'),
  ('Thor', '3 anos', 'Macho', 'Cachorro', 'Protetor e leal, ótimo companheiro.', 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=400&fit=crop', 'disponivel'),
  ('Luna', '6 meses', 'Fêmea', 'Gato', 'Filhote curiosa e cheia de energia.', 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=400&fit=crop', 'disponivel');
