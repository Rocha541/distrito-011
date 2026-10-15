# Footer Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar o footer do Distrito 011 em um encerramento editorial com CTA, dados comerciais e assinatura da marca.

**Architecture:** `SiteFooter` preserva a interface `details` e ganha blocos semânticos para chamada, dados e assinatura. `index.css` contém a composição responsiva usando as variáveis e fonte existentes.

**Tech Stack:** React, TypeScript, CSS, Vitest e Testing Library.

**Spec:** `docs/superpowers/specs/2026-10-15-footer-redesign-design.md`

## Global Constraints

- Alterar somente footer e testes relacionados.
- Usar paleta e tipografia existentes; não adicionar dependências.
- Usar a chamada aprovada: “Seu próximo corte começa aqui.”.
- Preservar links seguros, foco visível e dados comerciais atuais.

---

### Task 1: Estrutura e teste do CTA

**Files:**
- Modify: `src/components/SiteFooter.test.tsx`
- Modify: `src/components/SiteFooter.tsx`

**Interfaces:**
- Consumes: `details: { address, hours, paymentMethods, whatsappUrl, instagramUrl }`.
- Produces: CTA, links de WhatsApp/agendamento, dados e assinatura “DISTRITO 011”.

- [ ] **Step 1: Escrever o teste que falha**

```tsx
expect(screen.getByRole('heading', { name: 'Seu próximo corte começa aqui.' })).toBeInTheDocument()
expect(screen.getByRole('link', { name: 'Agende seu corte' })).toHaveAttribute('href', 'https://appbarber.com.br/')
```

- [ ] **Step 2: Rodar o teste isolado**

Run: `npm.cmd test -- --run src/components/SiteFooter.test.tsx`

Expected: FAIL, pois o footer atual ainda não contém a chamada nem o CTA de agenda.

- [ ] **Step 3: Criar a marcação semântica mínima**

```tsx
<section className="site-footer__cta" aria-labelledby="footer-cta-title">
  <h2 id="footer-cta-title">Seu próximo corte começa <strong>aqui.</strong></h2>
  <nav aria-label="Ações de contato">...</nav>
</section>
```

Adicionar `site-footer__details` para os dados existentes e manter `target="_blank"` e `rel="noreferrer"` nos links externos.

- [ ] **Step 4: Confirmar o teste**

Run: `npm.cmd test -- --run src/components/SiteFooter.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add src/components/SiteFooter.tsx src/components/SiteFooter.test.tsx; git commit -m "feat: add footer call to action"`

### Task 2: Layout editorial e responsivo

**Files:**
- Modify: `src/index.css:147-153`
- Modify: `src/components/SiteFooter.test.tsx`

**Interfaces:**
- Consumes: classes `site-footer__cta`, `site-footer__details`, `site-footer__links` e `site-footer__brand`.
- Produces: faixa verde clara, base off-white e assinatura de grande escala sem overflow horizontal.

- [ ] **Step 1: Acrescentar asserções estruturais**

```tsx
expect(document.querySelector('.site-footer__cta')).toBeInTheDocument()
expect(document.querySelector('.site-footer__details')).toBeInTheDocument()
expect(document.querySelector('.site-footer__brand')).toHaveTextContent('DISTRITO 011')
```

- [ ] **Step 2: Implementar o CSS mínimo**

```css
.site-footer__cta { background: var(--green); color: #fff; }
.site-footer__details { background: #f7f8f6; color: var(--deep-green); }
.site-footer__brand { font-size: clamp(72px, 16vw, 240px); line-height: .8; }
```

Usar grid no desktop, uma coluna abaixo de 700px, foco visível nos links e `overflow: hidden` no footer para conter a assinatura.

- [ ] **Step 3: Rodar a verificação**

Run: `npm.cmd test -- --run src/components/SiteFooter.test.tsx; npm.cmd run lint; npm.cmd run build`

Expected: todos retornam código 0.

- [ ] **Step 4: Validar as larguras**

Abrir `http://localhost:4001` em 1366px e 390px; confirmar que a faixa, dados e assinatura não se sobrepõem e que não há rolagem horizontal no mobile.

- [ ] **Step 5: Commit**

Run: `git add src/index.css src/components/SiteFooter.test.tsx; git commit -m "feat: redesign site footer"`

### Task 3: Regressão

**Files:** nenhum.

- [ ] **Step 1: Rodar a suíte completa**

Run: `npm.cmd test -- --run`

Expected: todas as suítes passam.

- [ ] **Step 2: Validar o diff**

Run: `git diff --check; git status --short`

Expected: sem erros de whitespace ou arquivos não intencionais.
