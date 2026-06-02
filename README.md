# Sincro Front

Plataforma web **Sincro** construída com Next.js para gestao de equipes, projetos e tarefas.

## Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript 5.7**
- **Tailwind CSS 4** + componentes **Radix UI**
- **React Hook Form** + **Zod** (validacao)
- **Recharts** (graficos), **date-fns** (datas), **lucide-react** (icones)
- **next-themes** (tema dark/light)
- Fonte **Poppins** (Google Fonts)

## Páginas

| Rota        | Descricao                       |
| ----------- | ------------------------------- |
| `/`         | Redireciona para `/login`       |
| `/login`    | Tela de autenticacao            |
| `/dashboard`| Painel principal                |
| `/equipes`  | Gestao de equipes               |
| `/projetos` | Gestao de projetos              |
| `/tarefas`  | Gestao de tarefas               |

## Estrutura

```
app/          # Rotas e paginas (App Router)
components/   # Componentes reutilizaveis
contexts/     # Contextos React (tema, etc.)
hooks/        # Hooks customizados
lib/          # Utilitarios e helpers
public/       # Assets estaticos
```

## Como rodar

```bash
# Instalar dependencias
npm install
# ou: pnpm install

# Servidor de desenvolvimento
npm run dev

# Build de producao
npm run build

# Iniciar em producao
npm run start

# Lint
npm run lint
```

A aplicacao sobe em `http://localhost:3000`.

## Variaveis de ambiente

Configure conforme necessario em um arquivo `.env.local` (nao versionado). Analytics do Vercel e ativado automaticamente em producao via `@vercel/analytics`.
