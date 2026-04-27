# Helio Sync

Landing page institucional da plataforma Helio Sync, focada em gestão e rastreamento solar inteligente.

O projeto apresenta proposta de valor, modelo matematico, simulacão, estatisticas, funcionamento da solucão e formulário de contato com envio de e-mail via Resend.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- `tailwind-variants` e `tailwind-merge`
- `react-icons`
- API Route no servidor para contato
- Resend para envio de e-mails
- Vercel Analytics

## Funcionalidades

- SEO com metadados completos no App Router
- `robots.txt` e `sitemap.xml` gerados via rotas de metadata do Next.js
- Formulário de contato com validacão e feedback para o usuario
- Endpoint backend para disparo de e-mail

## Requisitos

- Node.js 20+
- npm 10+

## Como executar localmente

1. Instale as dependencias:

```bash
npm install
```

2. Configure as variaveis de ambiente criando o arquivo `.env.local` na raiz do projeto.

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse:

```text
http://localhost:3000
```

## Variaveis de ambiente

Crie um arquivo `.env.local` na raiz com os campos abaixo:

```env
# URL publica do site (usada em metadata, sitemap e robots)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Chave da API Resend
RESEND_API_KEY=

# Destinatarios do contato (separe por virgula para varios)
CONTACT_TO_EMAIL=contato@exemplo.com

# Remetente do e-mail no Resend
CONTACT_FROM_EMAIL=HelioSync <onboarding@resend.dev>
```

## API de contato

Endpoint: `POST /api/contact`

Payload esperado:

```json
{
	"name": "Nome",
	"email": "email@dominio.com",
	"message": "Mensagem"
}
```

Comportamento:

- Valida campos obrigatorios
- Valida formato de e-mail
- Escapa HTML do conteudo recebido
- Envia e-mail via Resend
- Retorna JSON com status de sucesso ou erro

## Scripts

- `npm run dev`: ambiente de desenvolvimento
- `npm run build`: build de producão
- `npm run start`: sobe app em modo producão
- `npm run lint`: lint do projeto

## Deploy

O deploy pode ser feito em qualquer plataforma que rode Next.js. Para Vercel:

1. Conecte o repositorio.
2. Configure as variaveis de ambiente.
3. Realize o deploy.

## Documentos

- Documento tecnico: [docs/Rastreamento Solar.md](docs/Rastreamento%20Solar.md)
- Mapa Mental: [docs/mapa.png](docs/mapa.png)
