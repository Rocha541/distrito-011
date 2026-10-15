# Pinned Style Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fixar a segunda seção por aproximadamente 150% da altura da tela e fazer somente as três imagens subirem sobre o conteúdo verde, usando GSAP ScrollTrigger.

**Architecture:** Extrair a seção de estilos de `App.tsx` para um componente focado, com uma referência de escopo e referências separadas para o painel fixado e o trilho das imagens. `useGSAP` cria uma timeline `ScrollTrigger` com pin, scrub e limpeza automática; CSS mantém o layout final e fornece o fallback sem movimento.

**Tech Stack:** React 19, TypeScript, GSAP, `@gsap/react`, ScrollTrigger, Vitest, Testing Library, CSS responsivo.

**Spec:** `docs/superpowers/specs/2026-10-09-pinned-style-scroll-design.md`

## Global Constraints

- O trecho fixado usa aproximadamente `150vh` de distância de rolagem.
- Somente o contêiner das imagens pode se mover durante o scroll.
- Hover e clique não podem alterar posição, tamanho ou escala dos cards.
- Desktop e notebook usam o pin completo; telas menores usam percurso reduzido.
- `prefers-reduced-motion: reduce` desativa pin e scrub e mostra as imagens na posição final.
- Todo GSAP deve ficar dentro de `useGSAP` com escopo React e limpeza automática.

---

### Task 1: Isolar a seção interativa de estilos

**Files:**
- Create: `src/components/StyleSection.tsx`
- Create: `src/components/StyleSection.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `siteConfig.bookingUrl` e as imagens `style-left.png`, `hero-left.png`, `style-right.png`.
- Produces: componente React `StyleSection(): JSX.Element`, com `.style-intro`, `.style-pin`, `.style-showcase` e três botões `.style-card`.

- [ ] **Step 1: Escrever o teste que exige a nova seção e preserva o clique**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import StyleSection from './StyleSection'

it('revela um estilo sem mover a estrutura do card', async () => {
  const user = userEvent.setup()
  render(<StyleSection />)

  const card = screen.getByRole('button', { name: /curly fade/i })
  expect(card).toHaveAttribute('aria-pressed', 'false')
  await user.click(card)
  expect(card).toHaveAttribute('aria-pressed', 'true')
  expect(document.querySelector('.style-pin')).toBeInTheDocument()
  expect(document.querySelector('.style-showcase')).toBeInTheDocument()
})
```

- [ ] **Step 2: Executar o teste e confirmar a falha inicial**

Run: `npm test -- --run src/components/StyleSection.test.tsx`

Expected: FAIL porque `src/components/StyleSection.tsx` ainda não existe.

- [ ] **Step 3: Extrair o componente com a marcação necessária para o pin**

```tsx
import { useState } from 'react'
import heroLeft from '../assets/figma/hero-left.png'
import styleLeft from '../assets/figma/style-left.png'
import styleRight from '../assets/figma/style-right.png'
import { siteConfig } from '../config/site'

const styleCards = [
  { image: styleLeft, title: 'Textured Fade', description: 'Textura no topo, laterais limpas e um acabamento que valoriza o movimento natural do cabelo.' },
  { image: heroLeft, title: 'Curly Fade', description: 'Ideal para cabelos ondulados, cacheados ou crespos, valorizando a textura sem deixar o corte pesado.' },
  { image: styleRight, title: 'Low Fade', description: 'Transição suave nas laterais, desenho preciso e um visual moderno que funciona em diferentes rotinas.' },
] as const

export default function StyleSection() {
  const [activeStyle, setActiveStyle] = useState<number | null>(null)

  return (
    <section className="style-intro" id="estilos">
      <div className="style-pin">
        <div className="section-heading">
          <h2>Estilo pensado para você</h2>
          <p>Na Distrito, cada corte é pensado para valorizar o seu estilo, seu rosto e sua personalidade. Do clássico ao moderno, ajudamos você a encontrar o visual que realmente <strong>combina com você.</strong></p>
          <a className="cta cta--white" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">Agende seu corte</a>
        </div>
        <div className="style-showcase">
          {styleCards.map((style, index) => (
            <button
              className={`style-card${activeStyle === index ? ' is-active' : ''}`}
              key={style.title}
              onClick={() => setActiveStyle(activeStyle === index ? null : index)}
              type="button"
              aria-pressed={activeStyle === index}
            >
              <img src={style.image} alt={`${style.title}: referência de corte masculino`} />
              <span className="style-card__overlay"><strong>{style.title}</strong><span>{style.description}</span></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
```

Substituir em `App.tsx` o estado, imports e JSX atuais da seção por:

```tsx
import StyleSection from './components/StyleSection'

// dentro de <main>
<StyleSection />
```

- [ ] **Step 4: Executar os testes do componente e da aplicação**

Run: `npm test -- --run src/components/StyleSection.test.tsx src/App.test.tsx`

Expected: PASS, 2 arquivos de teste aprovados.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/components/StyleSection.tsx src/components/StyleSection.test.tsx
git commit -m "refactor: isolate style showcase section"
```

---

### Task 2: Implementar o pin e a subida das imagens com GSAP

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `src/components/StyleSection.tsx`
- Modify: `src/components/StyleSection.test.tsx`

**Interfaces:**
- Consumes: elementos `.style-pin` e `.style-showcase` produzidos pela Task 1.
- Produces: timeline ScrollTrigger escopada, com `trigger`, `pin`, `scrub`, `end` e fallback de movimento reduzido.

- [ ] **Step 1: Instalar GSAP e a integração oficial com React**

Run: `npm install gsap @gsap/react`

Expected: `package.json` lista `gsap` e `@gsap/react` em `dependencies`, e o lockfile é atualizado.

- [ ] **Step 2: Escrever o teste que captura a configuração do ScrollTrigger**

Adicionar no topo de `StyleSection.test.tsx`:

```tsx
import { beforeEach, vi } from 'vitest'

const timelineTo = vi.fn()
const timeline = { to: timelineTo }
const timelineFactory = vi.fn(() => timeline)

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    matchMedia: () => ({
      add: (_query: string, callback: () => void) => callback(),
      revert: vi.fn(),
    }),
    timeline: timelineFactory,
    set: vi.fn(),
  },
}))
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }))
vi.mock('@gsap/react', () => ({
  useGSAP: (callback: () => void) => callback(),
}))

beforeEach(() => {
  timelineFactory.mockClear()
  timelineTo.mockClear()
})
```

Adicionar o teste:

```tsx
it('fixa a seção por 150vh e move somente a galeria', () => {
  render(<StyleSection />)

  expect(timelineFactory).toHaveBeenCalledWith({
    scrollTrigger: expect.objectContaining({
      trigger: expect.any(HTMLElement),
      pin: expect.any(HTMLElement),
      scrub: true,
      end: '+=150%',
      invalidateOnRefresh: true,
    }),
  })
  expect(timelineTo).toHaveBeenCalledWith(
    expect.any(HTMLElement),
    expect.objectContaining({ yPercent: expect.any(Number), ease: 'none' }),
  )
})
```

- [ ] **Step 3: Executar o teste e confirmar a falha da animação ausente**

Run: `npm test -- --run src/components/StyleSection.test.tsx`

Expected: FAIL porque `timelineFactory` ainda não foi chamado.

- [ ] **Step 4: Adicionar referências, registro dos plugins e timeline**

Adicionar em `StyleSection.tsx`:

```tsx
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)
```

Dentro do componente, antes do retorno:

```tsx
const sectionRef = useRef<HTMLElement>(null)
const pinRef = useRef<HTMLDivElement>(null)
const showcaseRef = useRef<HTMLDivElement>(null)

useGSAP(() => {
  const section = sectionRef.current
  const pin = pinRef.current
  const showcase = showcaseRef.current
  if (!section || !pin || !showcase) return

  const media = gsap.matchMedia()

  const createScrollTimeline = (end: string, startY: number) => {
    gsap.set(showcase, { yPercent: 72 })
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end,
        pin,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
    timeline.to(showcase, { yPercent: startY, ease: 'none' })
  }

  media.add('(min-width: 701px) and (prefers-reduced-motion: no-preference)', () => {
    createScrollTimeline('+=150%', -18)
  })

  media.add('(max-width: 700px) and (prefers-reduced-motion: no-preference)', () => {
    createScrollTimeline('+=110%', -12)
  })

  media.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set(showcase, { clearProps: 'transform' })
  })

  return () => media.revert()
}, { scope: sectionRef })
```

Ligar as referências no JSX:

```tsx
<section ref={sectionRef} className="style-intro" id="estilos">
  <div ref={pinRef} className="style-pin">
    {/* heading */}
    <div ref={showcaseRef} className="style-showcase">
```

- [ ] **Step 5: Executar o teste focado**

Run: `npm test -- --run src/components/StyleSection.test.tsx`

Expected: PASS para interação e configuração GSAP.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/components/StyleSection.tsx src/components/StyleSection.test.tsx
git commit -m "feat: pin style section with gsap scrolltrigger"
```

---

### Task 3: Ajustar layout responsivo e verificar o fluxo completo

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/StyleSection.test.tsx`

**Interfaces:**
- Consumes: `.style-pin` e a transformação inline aplicada pelo GSAP.
- Produces: painel fixado de `100vh`, galeria sem transformação CSS concorrente e fallback estático acessível.

- [ ] **Step 1: Adicionar uma asserção de estrutura para o painel fixado**

Acrescentar ao primeiro teste de `StyleSection.test.tsx`:

```tsx
expect(document.querySelector('.style-pin')).toContainElement(document.querySelector('.section-heading'))
expect(document.querySelector('.style-pin')).toContainElement(document.querySelector('.style-showcase'))
```

- [ ] **Step 2: Remover a transformação CSS concorrente e definir o palco do pin**

Em `src/index.css`, substituir as regras estruturais da segunda seção por:

```css
.style-intro {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  background: var(--green);
  color: #fff;
}
.style-pin {
  position: relative;
  height: 100vh;
  min-height: 760px;
  overflow: hidden;
  background: var(--green);
}
.style-showcase {
  position: absolute;
  z-index: 3;
  left: 0;
  right: 0;
  top: 48%;
  height: min(720px, 72vh);
  display: grid;
  grid-template-columns: 1fr 1.025fr 1.083fr;
  will-change: transform;
}
```

Manter as regras atuais de hover apenas para `filter`, `opacity` e a translação interna do texto. Remover qualquer `transform` estrutural anterior de `.style-showcase`.

- [ ] **Step 3: Ajustar tablets, celulares e movimento reduzido**

Adicionar ao final de `src/index.css`:

```css
@media (max-width: 1100px) {
  .style-pin { min-height: 680px; }
  .style-showcase { top: 52%; height: min(650px, 66vh); }
}

@media (max-width: 700px) {
  .style-pin { min-height: 620px; }
  .style-showcase { top: 55%; height: min(520px, 58vh); }
}

@media (prefers-reduced-motion: reduce) {
  .style-intro { min-height: auto; }
  .style-pin { height: auto; min-height: auto; overflow: visible; }
  .style-showcase { position: relative; top: auto; height: 520px; margin-top: 72px; transform: none !important; }
}
```

- [ ] **Step 4: Executar toda a suíte automatizada**

Run: `npm test -- --run && npm run lint && npm run build && git diff --check`

Expected: todos os testes passam, lint sem erros, build Vite concluído e nenhum erro de whitespace.

- [ ] **Step 5: Verificar visualmente no navegador**

Run: `npm run dev -- --host 127.0.0.1`

Verificar em `1280x800`:

- a seção verde fixa quando alcança o topo;
- título, texto e botão não se movem durante aproximadamente 1,5 tela;
- somente as três imagens sobem, atravessando visualmente o fundo;
- os cards não crescem nem sobem no hover;
- o hover escurece a foto e revela o texto;
- após o pin, a seção “Seu momento começa antes do corte” segue normalmente.

Repetir em largura de celular e com `prefers-reduced-motion: reduce`.

- [ ] **Step 6: Commit**

```bash
git add src/index.css src/components/StyleSection.test.tsx
git commit -m "style: polish pinned style scroll layout"
```
