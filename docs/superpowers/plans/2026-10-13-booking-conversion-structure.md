# Booking Conversion Structure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorder the existing Distrito 011 landing sections and add isolated booking-conversion sections without altering any existing section's content, visuals, interactions, assets, CTA labels, or CTA destinations.

**Architecture:** The existing JSX blocks remain byte-for-byte intact internally; only their top-level placement in `App.tsx` changes. Two new presentational components live in `src/components/`: `BookingCtaSection` is immediately usable and points to the existing AppBarber URL, while `SocialProofSection` accepts only approved real testimonial data and is not rendered until that data is supplied.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, React Testing Library, GSAP, existing CSS.

**Spec:** `docs/superpowers/specs/2026-10-13-estrutura-conversao-agendamento-design.md`

## Source workspace

The runnable source is in `C:/Users/arthu/.codex/worktrees/barbershop-landing/distrito 011`. The current documentation repository does not contain the application source. Execute every source-file task from that worktree.

## Global Constraints

- Do not modify existing section internals: Hero, `StyleSection`, Ambiente, Serviços, or Distrito Club.
- Do not alter existing text, images, image crops, buttons, links, colors, typography, spacing, CSS classes, GSAP behavior, or interactions.
- Only move the existing top-level section blocks in `src/App.tsx`.
- New styles must target only new component class names; no selector may match an existing class or element.
- Do not create fictional testimonials, invented ratings, names, photos, prices, durations, policies, or FAQ answers.
- Use the existing `siteConfig.bookingUrl` for the new booking CTA.
- Keep external links opening in a new tab with `rel="noreferrer"`.
- The approved existing-section order is Hero → StyleSection → Ambiente → Serviços → new social proof → new booking CTA → Distrito Club.

---

### Task 1: Lock the existing sections before reordering

**Files:**
- Modify: `src/App.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: the existing headings, CTAs, assets, and section markup in `App.tsx`.
- Produces: a regression test that proves the original section content remains present and establishes the required order.

- [ ] **Step 1: Write a failing order-preservation test in `src/App.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import App from './App'

it('mantém as seções existentes na nova ordem sem perder seus CTAs', () => {
  render(<App />)

  const pageText = document.body.textContent ?? ''
  const positions = [
    'Seu estilo.\nSeu distrito.',
    'Estilo pensado para você',
    'Seu momento começa antes do corte.',
    'Tudo que seu estilo precisa',
    'Quem já passou por aqui',
    'Pronto para mudar o visual?',
    'Seu estilo sempre em dia.',
  ].map((text) => pageText.indexOf(text.replace('\n', '')))

  expect(positions.every((position) => position >= 0)).toBe(true)
  expect(positions).toEqual([...positions].sort((a, b) => a - b))
  expect(screen.getByRole('link', { name: 'Chamar no WhatsApp' })).toHaveAttribute('href', 'https://wa.me/5511940111517')
  expect(screen.getAllByRole('link', { name: 'Agende seu corte' })[0]).toHaveAttribute('href', 'https://appbarber.com.br/')
})
```

- [ ] **Step 2: Run the targeted test and verify it fails because the new sections do not exist**

Run: `npm test -- --run src/App.test.tsx`

Expected: FAIL because `Quem já passou por aqui` and `Pronto para mudar o visual?` are absent.

- [ ] **Step 3: Capture a baseline before editing existing markup**

Run: `git diff -- src/App.tsx src/components/StyleSection.tsx src/App.css`

Expected: no pre-existing uncommitted changes. If changes exist, stop and ask the user how to proceed; do not overwrite them.

- [ ] **Step 4: Preserve the exact existing JSX blocks**

Keep the JSX inside the existing Hero, `StyleSection`, Ambiente, Serviços, and Distrito Club blocks unchanged. Add only imports and new component nodes around those blocks in later tasks.

- [ ] **Step 5: Commit the test before implementation**

```bash
git add src/App.test.tsx
git commit -m "test: lock existing landing sections"
```

### Task 2: Add the isolated booking CTA section

**Files:**
- Create: `src/components/BookingCtaSection.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.css`
- Modify: `src/App.test.tsx`

**Interfaces:**
- Consumes: `siteConfig.bookingUrl` and the existing `.cta` base class.
- Produces: `BookingCtaSection(): JSX.Element`, a new standalone section with no dependency on existing section styles.

- [ ] **Step 1: Add the booking-CTA assertions to `src/App.test.tsx`**

```tsx
expect(screen.getByRole('heading', { name: 'Pronto para mudar o visual?' })).toBeInTheDocument()
expect(screen.getByRole('link', { name: 'Agendar meu horário' }))
  .toHaveAttribute('href', 'https://appbarber.com.br/')
```

- [ ] **Step 2: Run the targeted test and confirm it fails**

Run: `npm test -- --run src/App.test.tsx`

Expected: FAIL because the heading and `Agendar meu horário` link do not exist.

- [ ] **Step 3: Create `src/components/BookingCtaSection.tsx`**

```tsx
import { siteConfig } from '../config/site'

export default function BookingCtaSection() {
  return (
    <section className="booking-cta-section" aria-labelledby="booking-cta-title">
      <div className="booking-cta-section__content">
        <h2 id="booking-cta-title">Pronto para mudar o visual?</h2>
        <p>Escolha seu horário e venha viver a experiência Distrito 011.</p>
        <a className="cta booking-cta-section__link" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">
          Agendar meu horário
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Append styles scoped exclusively to `.booking-cta-section` in `src/App.css`**

Use selectors beginning with `.booking-cta-section`; do not alter or extend existing selectors. Implement its layout, colors, spacing, focus state, and responsive behavior only inside that namespace.

```css
.booking-cta-section { /* new section only */ }
.booking-cta-section__content { /* new section only */ }
.booking-cta-section__link:focus-visible { /* new section only */ }
```

- [ ] **Step 5: Import and render the new component immediately before the existing Distrito Club JSX**

```tsx
import BookingCtaSection from './components/BookingCtaSection'

// After the new social-proof component and before <section className="membership-section" id="plano">
<BookingCtaSection />
```

- [ ] **Step 6: Run the focused tests and quality checks**

Run:

```bash
npm test -- --run src/App.test.tsx
npm run lint
npm run build
```

Expected: all commands exit with code 0.

- [ ] **Step 7: Commit the isolated booking CTA**

```bash
git add src/components/BookingCtaSection.tsx src/App.tsx src/App.css src/App.test.tsx
git commit -m "feat: add booking conversion section"
```

### Task 3: Add social proof only from approved testimonials

**Files:**
- Create: `src/components/SocialProofSection.tsx`
- Create: `src/components/SocialProofSection.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.css`

**Interfaces:**
- Consumes: an approved `testimonials` array with `name`, `quote`, and optional `service` fields.
- Produces: `SocialProofSection({ testimonials }): JSX.Element | null`; it renders nothing when no approved testimonial exists.

- [ ] **Step 1: Obtain source-approved testimonial data before coding this section**

Collect at least three real testimonials, each with permission for use and these values:

```ts
{ name: 'Nome ou iniciais autorizados', quote: 'Depoimento aprovado', service: 'Serviço opcional' }
```

Do not proceed with sample reviews, placeholders, inferred reviews, or AI-generated testimonials.

- [ ] **Step 2: Write the failing component test in `src/components/SocialProofSection.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import SocialProofSection from './SocialProofSection'

it('mostra somente depoimentos fornecidos', () => {
  render(<SocialProofSection testimonials={[{ name: 'R. S.', quote: 'Atendimento aprovado.', service: 'Corte' }]} />)
  expect(screen.getByRole('heading', { name: 'Quem já passou por aqui' })).toBeInTheDocument()
  expect(screen.getByText('Atendimento aprovado.')).toBeInTheDocument()
  expect(screen.getByText('R. S.')).toBeInTheDocument()
})

it('não renderiza a seção sem depoimentos aprovados', () => {
  const { container } = render(<SocialProofSection testimonials={[]} />)
  expect(container).toBeEmptyDOMElement()
})
```

- [ ] **Step 3: Run the component test and confirm it fails**

Run: `npm test -- --run src/components/SocialProofSection.test.tsx`

Expected: FAIL because the component does not exist.

- [ ] **Step 4: Create the strictly data-driven component**

```tsx
type Testimonial = { name: string; quote: string; service?: string }

export default function SocialProofSection({ testimonials }: { testimonials: readonly Testimonial[] }) {
  if (testimonials.length === 0) return null

  return (
    <section className="social-proof-section" aria-labelledby="social-proof-title">
      <h2 id="social-proof-title">Quem já passou por aqui</h2>
      <div className="social-proof-section__list">
        {testimonials.map(({ name, quote, service }) => (
          <figure className="social-proof-section__item" key={`${name}-${quote}`}>
            <blockquote>“{quote}”</blockquote>
            <figcaption>{name}{service ? ` · ${service}` : ''}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Add only `.social-proof-section`-scoped CSS and render it after the unchanged services block**

Pass only the approved testimonial array from `App.tsx`. Place `<SocialProofSection testimonials={testimonials} />` after the existing `services-section` and before `<BookingCtaSection />`.

- [ ] **Step 6: Run all checks**

Run:

```bash
npm test -- --run
npm run lint
npm run build
```

Expected: all commands exit with code 0.

- [ ] **Step 7: Visually verify preservation in desktop and mobile**

Compare the Hero, Estilos, Ambiente, Serviços, and Distrito Club with their pre-change screenshots. Confirm they retain the same content, image crops, button labels, layout, animations, and interactions. Confirm the final top-level order is Hero → Estilos → Ambiente → Serviços → Prova social → CTA de agendamento → Distrito Club.

- [ ] **Step 8: Commit the social-proof section**

```bash
git add src/components/SocialProofSection.tsx src/components/SocialProofSection.test.tsx src/App.tsx src/App.css src/App.test.tsx
git commit -m "feat: add approved customer proof"
```

### Task 4: Add FAQ only from confirmed operating information

**Files:**
- Create: `src/components/FaqSection.tsx`
- Create: `src/components/FaqSection.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.css`

**Interfaces:**
- Consumes: an approved `faqItems` array with `question` and `answer` fields.
- Produces: `FaqSection({ items }): JSX.Element | null`; it renders nothing until confirmed answers are available.

- [ ] **Step 1: Obtain the confirmed FAQ inputs before coding**

Get explicit answers for these questions from the barbershop:

```ts
[
  { question: 'Como agendar e remarcar um horário?', answer: 'Resposta confirmada' },
  { question: 'Onde fica a Distrito 011?', answer: 'Resposta confirmada' },
  { question: 'Quais são as formas de pagamento?', answer: 'Resposta confirmada' },
  { question: 'Quanto tempo dura cada serviço?', answer: 'Resposta confirmada' },
  { question: 'Preciso saber qual corte quero antes de agendar?', answer: 'Resposta confirmada' },
  { question: 'Como funciona o Distrito Club?', answer: 'Resposta confirmada' },
]
```

Do not infer answers from the booking platform or write provisional operational policies.

- [ ] **Step 2: Write the failing component test in `src/components/FaqSection.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import FaqSection from './FaqSection'

it('expõe as perguntas e respostas confirmadas', () => {
  render(<FaqSection items={[{ question: 'Como agendar?', answer: 'Pelo AppBarber.' }]} />)
  expect(screen.getByRole('heading', { name: 'Dúvidas frequentes' })).toBeInTheDocument()
  expect(screen.getByText('Como agendar?')).toBeInTheDocument()
  expect(screen.getByText('Pelo AppBarber.')).toBeInTheDocument()
})

it('não renderiza o FAQ sem conteúdo confirmado', () => {
  const { container } = render(<FaqSection items={[]} />)
  expect(container).toBeEmptyDOMElement()
})
```

- [ ] **Step 3: Run the component test and confirm it fails**

Run: `npm test -- --run src/components/FaqSection.test.tsx`

Expected: FAIL because the component does not exist.

- [ ] **Step 4: Create the data-driven FAQ component**

```tsx
type FaqItem = { question: string; answer: string }

export default function FaqSection({ items }: { items: readonly FaqItem[] }) {
  if (items.length === 0) return null

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <h2 id="faq-title">Dúvidas frequentes</h2>
      {items.map(({ question, answer }) => (
        <details className="faq-section__item" key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </section>
  )
}
```

- [ ] **Step 5: Add only `.faq-section`-scoped CSS and render it after the unchanged Distrito Club section**

Pass only confirmed FAQ items from `App.tsx`. Place `<FaqSection items={faqItems} />` after the existing `membership-section`; do not edit that existing block.

- [ ] **Step 6: Run the full verification suite**

Run:

```bash
npm test -- --run
npm run lint
npm run build
```

Expected: all commands exit with code 0.

- [ ] **Step 7: Commit the FAQ section**

```bash
git add src/components/FaqSection.tsx src/components/FaqSection.test.tsx src/App.tsx src/App.css
git commit -m "feat: add confirmed FAQ"
```

### Task 5: Add footer only from confirmed business details

**Files:**
- Create: `src/components/SiteFooter.tsx`
- Create: `src/components/SiteFooter.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.css`

**Interfaces:**
- Consumes: approved `FooterDetails` with address, hours, contact link, and optional social links.
- Produces: `SiteFooter({ details }): JSX.Element | null`; it renders only after the business details are confirmed.

- [ ] **Step 1: Obtain the approved footer details before coding**

Collect the exact address, opening hours, preferred public contact, and approved social-media URLs. Do not guess location, availability, or account handles.

- [ ] **Step 2: Write the failing component test in `src/components/SiteFooter.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import SiteFooter from './SiteFooter'

it('mostra apenas os dados comerciais fornecidos', () => {
  render(<SiteFooter details={{ address: 'Endereço confirmado', hours: 'Horário confirmado', contactUrl: 'https://wa.me/5511940111517' }} />)
  expect(screen.getByText('Endereço confirmado')).toBeInTheDocument()
  expect(screen.getByText('Horário confirmado')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Falar no WhatsApp' })).toHaveAttribute('href', 'https://wa.me/5511940111517')
})
```

- [ ] **Step 3: Run the component test and confirm it fails**

Run: `npm test -- --run src/components/SiteFooter.test.tsx`

Expected: FAIL because the component does not exist.

- [ ] **Step 4: Create the typed footer component**

```tsx
type FooterDetails = {
  address: string
  hours: string
  contactUrl: string
  socialLinks?: readonly { label: string; href: string }[]
}

export default function SiteFooter({ details }: { details: FooterDetails }) {
  return (
    <footer className="site-footer">
      <p>DISTRITO 011</p>
      <address>{details.address}</address>
      <p>{details.hours}</p>
      <a href={details.contactUrl} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
      {details.socialLinks?.map(({ label, href }) => <a href={href} key={href} target="_blank" rel="noreferrer">{label}</a>)}
    </footer>
  )
}
```

- [ ] **Step 5: Add only `.site-footer`-scoped CSS and render it after the new FAQ**

Pass only approved business details from `App.tsx`. Place `<SiteFooter details={footerDetails} />` after `<FaqSection items={faqItems} />`; do not modify the existing Distrito Club section.

- [ ] **Step 6: Run final checks and inspect the page**

Run:

```bash
npm test -- --run
npm run lint
npm run build
```

Then inspect desktop and mobile to confirm existing sections are untouched and all new sections appear in the approved order.

- [ ] **Step 7: Commit the footer**

```bash
git add src/components/SiteFooter.tsx src/components/SiteFooter.test.tsx src/App.tsx src/App.css
git commit -m "feat: add confirmed business footer"
```
