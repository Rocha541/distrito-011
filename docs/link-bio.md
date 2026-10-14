# Link na bio — Distrito 011

Página independente em `/bio/`, no mesmo build da landing page em `/`.

## Desenvolvimento

```sh
npm ci
npm run dev -- --port 4002
```

Abra `http://localhost:4002/bio/`. Para gerar os dois sites, execute `npm run build`; os arquivos saem em `dist/index.html` e `dist/bio/index.html`.

## Referência e destinos

A página segue o site existente: DM Sans, verde #184634 e #011c14, títulos com peso 900, cantos de 16px e espaçamentos de 12/16/24/32px. Ela foi desenhada mobile-first, com links grandes em uma coluna e sem imagem; no desktop, a mesma composição central é preservada.

Os quatro destinos estão em `src/config/site.ts`. Instagram e WhatsApp são os mesmos do footer. AppBarber mantém o endereço genérico existente no projeto (`https://appbarber.com.br/`); deve ser substituído pelo endereço direto de agendamento quando disponível. O link Site usa `/`, levando à landing principal no mesmo domínio, sem depender de um domínio ainda não configurado.

Trabalho isolado no worktree `link-bio`, branch `codex/link-bio`, baseado no commit `a0b5c49` da versão com footer e equipe. Nenhum deploy foi solicitado; a entrega é local.
