# Rosmaninho Fotografia

Portefólio fotográfico de Luísa Rosmaninho ([rosmaninhofotografia.pt](https://rosmaninhofotografia.pt)), construído com TanStack Start + React 19 + Tailwind CSS v4.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | TanStack Start (SSR) + TanStack Router |
| UI | React 19, Tailwind CSS v4, Radix UI, Framer Motion |
| Base de dados | PostgreSQL via `pg` — ligação via `DATABASE_URL` |
| Servidor de dev | Vite na porta 5000 |
| Build / deploy | Node.js autónomo (`npm run build` + `npm start`) |

## Início rápido (local / VS Code)

```bash
# 1. Clonar
git clone https://github.com/luisarosmaninho/rosmaninho-pix-studio.git
cd rosmaninho-pix-studio

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env — o mínimo é definir ADMIN_PASSWORD
# DATABASE_URL é opcional: sem ele a app corre em modo JSON-only

# 4. Arrancar o servidor de desenvolvimento
npm run dev
# → http://localhost:5000
```

> **Modo JSON-only (sem base de dados):** se `DATABASE_URL` não estiver definido, toda a informação é lida e escrita directamente nos ficheiros `*-config.json` na raiz do projecto. Ideal para desenvolvimento local sem instalar PostgreSQL.

## Variáveis de ambiente

Ver `.env.example` para todas as variáveis com descrições.

| Variável | Obrigatório | Descrição |
|---|---|---|
| `ADMIN_PASSWORD` | Recomendado | Palavra-passe para `/admin` — omitir usa `"rosmaninho"` |
| `DATABASE_URL` | Opcional | PostgreSQL — sem isto usa ficheiros JSON |
| `GITHUB_TOKEN` | Opcional | PAT para o botão "Publicar no GitHub" no admin (HTTPS) |
| `SMTP_HOST/PORT/USER/PASS` | Opcional | SMTP para o formulário de contacto enviar emails |
| `CONTACT_EMAIL` | Opcional | Endereço de destino dos emails do formulário |

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Página inicial |
| `/portfolio` | Arquivo de fotografias |
| `/portfolio/:category` | Série — `urbanas`, `natureza`, `retratos`, `iguarias` |
| `/diario` | Caderno de Matcha (diário) |
| `/diario/:slug` | Entrada individual do diário |
| `/notas` | Notas de campo |
| `/sobre` | Autora |
| `/contacto` | Formulário de contacto |
| `/admin` | Painel de conteúdo (protegido por password) |
| `/rosemary` | Rota secreta (escrever "rosemary" em qualquer página) |
| `/api/rss` | Feed RSS do diário |

## Scripts

```bash
npm run dev        # Servidor de desenvolvimento (porta 5000)
npm run build      # Build de produção
npm run preview    # Pré-visualizar o build localmente
npm run lint       # ESLint
npm run format     # Prettier
npm run sitemap    # Gerar sitemap
```

## Gestão de conteúdo

Toda a informação do admin é guardada na **PostgreSQL** (`admin_config`) E em simultâneo nos ficheiros JSON (`*-config.json`). Em modo JSON-only os ficheiros são a única fonte.

**Fluxo de sincronização:**
1. Editar conteúdo em `/admin` → guarda na DB + actualiza JSON
2. Clicar **"Publicar no GitHub"** → commit dos JSON + push para o repositório
3. Novo deploy lê os JSON → migra para a sua própria DB → serve

Desta forma dev e produção convergem após um push, sem migração manual de dados.

## Base de dados

Tabela única `admin_config` — criada automaticamente no primeiro arranque:

```sql
CREATE TABLE admin_config (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Deploy

O site compila para um servidor Node.js autónomo:

```bash
npm run build
npm start          # equivale a: node dist/server/server.js
```

### Docker

```bash
docker build -t rosmaninho .
docker run -p 3000:3000 \
  -e ADMIN_PASSWORD=... \
  -e DATABASE_URL=... \
  rosmaninho
```

### Plataformas

| Plataforma | Como fazer deploy |
|---|---|
| **Railway** | Ligar repositório → detecta Node automaticamente |
| **Render** | Build: `npm run build` · Start: `npm start` |
| **Fly.io** | `fly launch` — usa o `Dockerfile` incluído |
| **VPS próprio** | `npm run build` + `npm start` com PM2 ou systemd |
| **Cloudflare Workers** | `wrangler deploy` (ver `wrangler.jsonc`) |

## Notas

- Modo escuro/claro comuta automaticamente com o nascer e pôr do sol em Coimbra (40.2033°N, 8.4103°W)
- Protecção CSRF activa via TanStack Start middleware (`src/start.ts`)
- Feed RSS em `/api/rss` lê da DB (fallback para `journal-config.json`)
