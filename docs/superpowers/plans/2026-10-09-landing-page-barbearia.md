# Landing page da barbearia Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar uma landing page de barbearia em React, responsiva e fiel ao Figma, com CTAs para WhatsApp e AppBarber.

**Architecture:** Um único aplicativo Vite monta seções de apresentação reutilizáveis em `App.tsx`. O conteúdo variável e as URLs externas ficam em `src/config/site.ts`; cada componente recebe somente os dados necessários por props, e Tailwind define o layout mobile-first e os breakpoints desktop.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS 4, Vitest, React Testing Library, ESLint.

**Spec:** `docs/superpowers/specs/2026-10-09-landing-page-barbearia-design.md`

## Global Constraints

- Implementar somente uma landing estática, sem backend, banco de dados, autenticação, formulário, CRM, analytics ou pagamentos.
- Usar React 19, TypeScript, Vite, Tailwind CSS e ESLint.
- Usar `https://wa.me/5511940111517` para contato pelo WhatsApp.
- Manter a URL provisória do AppBarber em um único arquivo de configuração.
- Abrir destinos externos em nova aba com `target="_blank"` e `rel="noreferrer"`.
- Construir responsivamente, de mobile para desktop, usando as referências do Figma.
- Aplicar HTML semântico, foco visível e textos alternativos em imagens informativas.

---

## Estrutura de arquivos

- `package.json`: scripts e dependências do aplicativo.
- `vite.config.ts`: configuração do Vite e Vitest.
- `src/main.tsx`: ponto de montagem React.
- `src/index.css`: importação Tailwind, tokens de cor/fonte e estilos globais mínimos.
- `src/config/site.ts`: contatos, CTA e conteúdo estático reutilizável.
- `src/config/site.test.ts`: teste das URLs externas centralizadas.
- `src/components/ExternalCta.tsx`: link externo acessível e reutilizável.
- `src/components/Header.tsx`, `Hero.tsx`, `Services.tsx`, `Professionals.tsx`, `Testimonials.tsx`, `Footer.tsx`: seções da landing.
- `src/App.tsx`: composição ordenada das seções.
- `src/App.test.tsx`: teste de integração dos destinos dos CTAs.
- `src/assets/`: imagens baixadas do Figma nos nomes semânticos correspondentes.

### Task 1: Criar o aplicativo e a base de qualidade

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`
- Create: `src/test/setup.ts`
- Modify: `.gitignore`

**Interfaces:**
- Produces: scripts `dev`, `build`, `lint`, `test` e o ambiente React/Vitest usado por todas as tarefas posteriores.

- [ ] **Step 1: Gerar o projeto React TypeScript com Vite**

Run:

```powershell
npm create vite@latest . -- --template react-ts
npm install
```

- [ ] **Step 2: Adicionar Tailwind, Vitest e bibliotecas de teste**

Run:

```powershell
npm install tailwindcss @tailwindcss/vite
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 3: Configurar Vite, Vitest e Tailwind**

Configure `vite.config.ts` com o plugin React, `tailwindcss()` e o bloco:

```ts
test: {
  environment: 'jsdom',
  setupFiles: './src/test/setup.ts',
  globals: true,
}
```

Em `src/index.css`, importe Tailwind e defina as variáveis de superfície, texto e verde de destaque usadas pela referência:

```css
@import 'tailwindcss';

@theme {
  --color-ink: #101311;
  --color-brand: #0f5c43;
  --color-paper: #f7f5ef;
}
```

Em `src/test/setup.ts`, importe `@testing-library/jest-dom/vitest`.

- [ ] **Step 4: Verificar a base**

Run:

```powershell
npm run lint
npm run build
npm test -- --run
```

Expected: os três comandos encerram com código 0.

- [ ] **Step 5: Commit**

```powershell
git add .gitignore package.json package-lock.json vite.config.ts tsconfig.json index.html src
git commit -m "chore: scaffold React landing page"
```

### Task 2: Centralizar destinos externos com teste primeiro

**Files:**
- Create: `src/config/site.test.ts`
- Create: `src/config/site.ts`

**Interfaces:**
- Produces: `siteConfig` com `whatsappUrl: string` e `bookingUrl: string`.
- Consumes: ambiente Vitest da Task 1.

- [ ] **Step 1: Escrever o teste que falha**

```ts
import { describe, expect, it } from 'vitest'
import { siteConfig } from './site'

describe('siteConfig', () => {
  it('centraliza os destinos de contato e agendamento', () => {
    expect(siteConfig.whatsappUrl).toBe('https://wa.me/5511940111517')
    expect(new URL(siteConfig.bookingUrl).protocol).toBe('https:')
  })
})
```

- [ ] **Step 2: Executar para confirmar a falha esperada**

Run: `npm test -- --run src/config/site.test.ts`

Expected: FAIL porque o módulo `./site` ainda não existe.

- [ ] **Step 3: Implementar a configuração mínima**

```ts
export const siteConfig = {
  whatsappUrl: 'https://wa.me/5511940111517',
  bookingUrl: 'https://appbarber.com.br/',
} as const
```

- [ ] **Step 4: Executar o teste e as checagens completas**

Run:

```powershell
npm test -- --run src/config/site.test.ts
npm run lint
```

Expected: todos passam.

- [ ] **Step 5: Commit**

```powershell
git add src/config/site.ts src/config/site.test.ts
git commit -m "feat: centralize landing page links"
```

### Task 3: Implementar o esqueleto semântico e CTAs

**Files:**
- Create: `src/components/ExternalCta.tsx`
- Create: `src/components/Header.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/Services.tsx`
- Create: `src/components/Professionals.tsx`
- Create: `src/components/Testimonials.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/App.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `siteConfig.whatsappUrl` e `siteConfig.bookingUrl` da Task 2.
- Produces: `ExternalCta({ href, children, className? })`, um link externo seguro; `App`, a página composta.

- [ ] **Step 1: Escrever o teste de integração que falha**

```tsx
import { render, screen } from '@testing-library/react'
import App from './App'

it('expõe CTAs para WhatsApp e agendamento', () => {
  render(<App />)

  expect(screen.getAllByRole('link', { name: /whatsapp/i })[0])
    .toHaveAttribute('href', 'https://wa.me/5511940111517')
  expect(screen.getAllByRole('link', { name: /agendar/i })[0])
    .toHaveAttribute('href', 'https://appbarber.com.br/')
})
```

- [ ] **Step 2: Executar para confirmar a falha esperada**

Run: `npm test -- --run src/App.test.tsx`

Expected: FAIL porque `App` inicial ainda não contém os CTAs.

- [ ] **Step 3: Implementar componentes mínimos e composição**

Implemente `ExternalCta` com:

```tsx
export function ExternalCta({ href, children, className }: ExternalCtaProps) {
  return <a href={href} target="_blank" rel="noreferrer" className={className}>{children}</a>
}
```

Estruture `App` para renderizar, em ordem: `Header`, `main` com `Hero`, `Services`, `Professionals`, `Testimonials`, e `Footer`. Use cabeçalhos, listas e links reais; passe as URLs de `siteConfig` para os componentes que exibem CTAs.

- [ ] **Step 4: Executar os testes**

Run: `npm test -- --run src/App.test.tsx src/config/site.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/App.tsx src/App.test.tsx src/components
git commit -m "feat: add landing page sections and calls to action"
```

### Task 4: Aplicar a composição visual do Figma e os recursos locais

**Files:**
- Create: `src/assets/*`
- Modify: `src/index.css`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Services.tsx`
- Modify: `src/components/Professionals.tsx`
- Modify: `src/components/Testimonials.tsx`
- Modify: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: componentes e `siteConfig` das Tasks 2 e 3; recursos fornecidos pelo contexto de design do Figma.
- Produces: interface responsiva pronta para inspeção em desktop e mobile.

- [ ] **Step 1: Obter contexto de design e recursos do Figma**

Solicite o contexto dos frames desktop e mobile e o screenshot de referência. Baixe exclusivamente os recursos retornados para `src/assets/`, mantendo proporção e posição dos assets conforme cada frame.

- [ ] **Step 2: Conferir a ausência de referências remotas do Figma**

Run: `rg -n "figma\.com|figma\.net" src`

Expected: nenhum resultado; os assets devem ser locais.

- [ ] **Step 3: Aplicar layout mobile-first**

Implemente as seguintes regras em Tailwind:

```tsx
className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12"
className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
className="py-14 sm:py-20 lg:py-28"
```

Use a paleta `ink`, `brand` e `paper`, reproduza a hierarquia de tipografia, blocos de serviços e cards de profissionais presentes no Figma. Imagens de pessoas recebem `alt` descritivo; itens decorativos recebem `alt=""`.

- [ ] **Step 4: Validar build e inspeção visual**

Run:

```powershell
npm run lint
npm test -- --run
npm run build
```

Abra a aplicação em viewport mobile e desktop; compare cada seção visível com os frames do Figma e corrija espaçamento, tipografia, cores, assets e geometria antes de prosseguir.

- [ ] **Step 5: Commit**

```powershell
git add src/assets src/index.css src/components
git commit -m "feat: style responsive barbershop landing page"
```

### Task 5: Verificação de entrega

**Files:**
- Modify: nenhum, salvo correções identificadas.

**Interfaces:**
- Consumes: aplicativo completo das Tasks 1–4.
- Produces: evidência de que a landing compila, é checada e possui CTAs corretos.

- [ ] **Step 1: Rodar a suíte de validação completa**

Run:

```powershell
npm run lint
npm test -- --run
npm run build
```

Expected: os três comandos encerram com código 0, sem erros ou avisos.

- [ ] **Step 2: Confirmar requisitos de links e acessibilidade básica**

Run:

```powershell
rg -n "wa.me/5511940111517|appbarber.com.br|target=\"_blank\"|rel=\"noreferrer\"" src
```

Expected: CTAs externos apontam para os dois destinos centralizados e usam abertura segura em nova aba.

- [ ] **Step 3: Fazer a inspeção final em navegador**

Confirme em desktop e mobile: conteúdo legível, foco visível via teclado, imagens proporcionais, nenhuma rolagem horizontal e CTAs acessíveis.

- [ ] **Step 4: Commit de correções, se houver**

```powershell
git add src
git commit -m "fix: polish landing page verification findings"
```
