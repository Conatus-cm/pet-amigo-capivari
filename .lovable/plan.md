

# 🐾 CCZ Digital Capivari — Sistema Web do Centro de Controle de Zoonoses

## Visão Geral
Portal web completo para o CCZ de Capivari-SP, com visual **acolhedor e amigável** (tons quentes: laranja, verde suave, bege), ícones de patinhas e tipografia convidativa. Totalmente responsivo. Backend com **Lovable Cloud (Supabase)** — gratuito.

---

## 🎨 Identidade Visual
- **Paleta**: Laranja quente, Verde suave, Bege claro, Branco
- **Estilo**: Cantos arredondados, cards com sombras suaves, ícones de patinhas
- **Logo**: "CCZ Digital Capivari" com ícone de patinha

---

## 🌐 Área Pública

### 1. Página Inicial (Home)
- Banner com mensagem de boas-vindas e imagem de animais
- Cards de acesso rápido: "Adote um amigo", "Denunciar maus-tratos", "Animal perdido?"
- Rodapé com contato do CCZ

### 2. Animais para Adoção
- Grid de cards com foto, nome, idade, sexo, espécie e descrição
- Filtros por espécie, sexo e idade
- Botão "Tenho Interesse" abre formulário (nome, telefone, e-mail)
- Página de detalhes do animal

### 3. Formulário de Denúncia de Maus-Tratos
- Campos: nome (opcional), telefone, endereço, descrição
- Upload de imagem como evidência
- Confirmação após envio

### 4. Animais Perdidos
- Formulário: foto, descrição, local onde foi visto, telefone
- Lista pública dos animais perdidos reportados

### 5. Página de Contato
- Telefone, endereço e horário do CCZ
- Mapa via OpenStreetMap (gratuito)
- Formulário de mensagem geral

---

## 🔐 Área Administrativa

### 6. Login de Administradores
- Login com e-mail e senha via Supabase Auth
- Controle de acesso por roles (tabela separada `user_roles`)

### 7. Dashboard
- Resumo: total de animais, denúncias pendentes, animais perdidos
- Gráficos simples de status

### 8. Gerenciar Animais
- Tabela com listagem, cadastro, edição, remoção
- Alterar status (disponível/adotado)
- Upload de foto

### 9. Gerenciar Denúncias
- Tabela com denúncias recebidas
- Visualizar detalhes e imagem
- Marcar como "em análise", "resolvida" ou "arquivada"

### 10. Gerenciar Animais Perdidos
- Tabela com registros, visualizar detalhes
- Marcar como "encontrado" ou arquivar

### 11. Gerenciar Interesses de Adoção
- Lista de pessoas interessadas com dados de contato

---

## 🗄️ Banco de Dados (Supabase)

**Tabelas:**
- **animais**: id, nome, idade, sexo, especie, descricao, foto_url, status, created_at
- **denuncias**: id, nome, telefone, endereco, descricao, imagem_url, status, created_at
- **animais_perdidos**: id, descricao, local, telefone, imagem_url, status, created_at
- **interesses_adocao**: id, animal_id, nome, telefone, email, created_at
- **contatos**: id, nome, email, mensagem, created_at
- **user_roles**: id, user_id, role (admin)

**Storage**: Bucket para upload de imagens

**Segurança**: RLS em todas as tabelas, função `has_role` para verificação de admin

