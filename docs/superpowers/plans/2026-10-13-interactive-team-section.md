# Interactive Team Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Figma-matched GSAP interactive team section between Ambiente and Serviços while preserving every existing landing section unchanged.

**Architecture:** `TeamSection` owns its team data, Figma-sourced local images, semantic profile markup, and its GSAP `ScrollTrigger` lifecycle. `App.tsx` only imports and places that component between the unchanged Ambiente and Serviços JSX blocks; `index.css` receives only `.team-section` namespaced rules.

**Tech Stack:** React 19, TypeScript, GSAP 3, `@gsap/react`, ScrollTrigger, Vitest, React Testing Library, existing CSS.

**Spec:** `docs/superpowers/specs/2026-10-13-equipe-interativa-design.md`

## Global Constraints

- Do not alter the content, images, image crops, classes, styles, CTAs, interactions, or GSAP behavior of existing sections.
- Insert the new `TeamSection` after the unchanged Ambiente section and before the unchanged Serviços section.
- Reuse `siteConfig.whatsappUrl` and `siteConfig.bookingUrl`; external links require `target="_blank"` and `rel="noreferrer"`.
- Download the two Figma images into `src/assets/figma/`; do not retain Figma URLs in source code.
- Use GSAP `ScrollTrigger` to pin only the new desktop team intro; never pin on mobile or with `prefers-reduced-motion: reduce`.
- Keep all new CSS selectors under the `.team-section` namespace.
- Render exactly the two Figma profiles: Guilherme Ribeiro and Matheus Costa.

---

### Task 1: Save and verify Figma assets locally

**Files:**
- Create: `src/assets/figma/guilherme-ribeiro.png`
- Create: `src/assets/figma/matheus-costa.png`

**Interfaces:**
- Consumes: Figma file `DE2OnJBtwGKmdIqArkLTVS`, node `38:529`, and the two raw image URLs returned by `figma_download_assets`.
- Produces: two non-empty local image files imported by `TeamSection`.

- [ ] **Step 1: Download the source assets from Figma**

Call `figma_download_assets` with:

```json
{ "fileKey": "DE2OnJBtwGKmdIqArkLTVS", "nodeId": "38:529" }
```

Identify the raw image of Guilherme Ribeiro and save it as `src/assets/figma/guilherme-ribeiro.png`; save Matheus Costa's raw image as `src/assets/figma/matheus-costa.png`. Use the actual source extension reported by the tool instead of forcing `.png` if Figma returns another format.

- [ ] **Step 2: Verify the files are present and non-empty**

Run:

```powershell
Get-Item src/assets/figma/guilherme-ribeiro.* , src/assets/figma/matheus-costa.* | Select-Object Name,Length
```

Expected: both files have a positive `Length`.

- [ ] **Step 3: Inspect the assets**

Open both local images and confirm Guilherme's portrait matches the top Figma profile and Matheus's portrait matches the second profile.

- [ ] **Step 4: Commit the assets**

```bash
git add src/assets/figma/guilherme-ribeiro.* src/assets/figma/matheus-costa.*
git commit -m "assets: add team portraits from figma"
```

### Task 2: Build and test the semantic team section

**Files:**
- Create: `src/components/TeamSection.tsx`
- Create: `src/components/TeamSection.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: local portrait modules and `siteConfig` URLs.
- Produces: `TeamSection(): JSX.Element`, containing the Figma introduction, two profiles, and the brand CTAs.

- [ ] **Step 1: Write the failing team-section test**

```tsx
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import TeamSection from './TeamSection'

it('apresenta os dois barbeiros e os CTAs da marca', () => {
  render(<TeamSection />)

  expect(screen.getByRole('heading', { name: 'Seu estilo nas mãos de quem entende' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Guilherme Ribeiro' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Matheus Costa' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Chamar no WhatsApp' })).toHaveAttribute('href', 'https://wa.me/5511940111517')
  expect(screen.getByRole('link', { name: 'Agende seu corte' })).toHaveAttribute('href', 'https://appbarber.com.br/')
})
```

- [ ] **Step 2: Run the test and confirm the missing-component failure**

Run: `npm test -- --run src/components/TeamSection.test.tsx`

Expected: FAIL because `./TeamSection` does not exist.

- [ ] **Step 3: Create the component with the exact Figma content**

```tsx
const teamMembers = [
  {
    name: 'Guilherme Ribeiro',
    role: 'Fundador da barbearia e especialista em visagismo masculino',
    biography: 'une técnica, experiência e percepção estética para criar cortes que valorizam os traços, a personalidade e o estilo de cada cliente. Seu trabalho vai além de seguir tendências: cada detalhe é pensado para construir uma imagem autêntica, equilibrada e feita para quem você é.',
    image: guilhermeRibeiro,
    alt: 'Guilherme Ribeiro, fundador da Distrito 011',
  },
  {
    name: 'Matheus Costa',
    role: 'Especialista em cortes modernos, fades e acabamento de precisão',
    biography: 'combina técnica e atenção aos detalhes para criar visuais marcantes e bem estruturados. Seu foco está em entender o estilo de cada cliente e entregar um corte atual, versátil e fácil de manter no dia a dia.',
    image: matheusCosta,
    alt: 'Matheus Costa, barbeiro da Distrito 011',
  },
] as const
```

Render the intro in an element with class `team-section__intro` and each member as an `article` with class `team-section__profile`. Use `h2` for the section title and `h3` for member names.

- [ ] **Step 4: Place the component without changing existing section internals**

```tsx
import TeamSection from './components/TeamSection'

// Render after the unchanged experience-section and before the unchanged services-section.
<TeamSection />
```

- [ ] **Step 5: Run the targeted test and confirm it passes**

Run: `npm test -- --run src/components/TeamSection.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit the semantic section**

```bash
git add src/components/TeamSection.tsx src/components/TeamSection.test.tsx src/App.tsx
git commit -m "feat: add team section content"
```

### Task 3: Add GSAP pinning and responsive Figma layout

**Files:**
- Modify: `src/components/TeamSection.tsx`
- Modify: `src/index.css`
- Modify: `src/components/TeamSection.test.tsx`

**Interfaces:**
- Consumes: rendered `.team-section`, `.team-section__intro`, and `.team-section__profiles` elements.
- Produces: a desktop-only GSAP `ScrollTrigger` pin and mobile/reduced-motion fallback in normal document flow.

- [ ] **Step 1: Add a regression test for both profile images and semantic titles**

```tsx
expect(screen.getByRole('img', { name: 'Guilherme Ribeiro, fundador da Distrito 011' })).toBeInTheDocument()
expect(screen.getByRole('img', { name: 'Matheus Costa, barbeiro da Distrito 011' })).toBeInTheDocument()
expect(screen.getByText('Fundador da barbearia e especialista em visagismo masculino')).toBeInTheDocument()
expect(screen.getByText('Especialista em cortes modernos, fades e acabamento de precisão')).toBeInTheDocument()
```

- [ ] **Step 2: Run the test and confirm it fails before the profile media is added**

Run: `npm test -- --run src/components/TeamSection.test.tsx`

Expected: FAIL until the local images and role text are rendered.

- [ ] **Step 3: Add the scoped GSAP lifecycle to `TeamSection.tsx`**

```tsx
const sectionRef = useRef<HTMLElement>(null)
const introRef = useRef<HTMLDivElement>(null)

useGSAP(() => {
  const section = sectionRef.current
  const intro = introRef.current
  if (!section || !intro) return

  const media = gsap.matchMedia()
  media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top+=72',
        end: 'bottom bottom-=72',
        pin: intro,
        pinSpacing: false,
      },
    })
    .from('.team-section__profile', { y: 52, opacity: 0, duration: .65, stagger: .18, ease: 'power3.out' })
  })

  return () => media.revert()
}, { scope: sectionRef })
```

- [ ] **Step 4: Add `.team-section`-scoped CSS to match the Figma frame**

Add a two-column desktop grid with a 1fr left panel and 706px right profile column. Use 16px image radius; 64px intro heading; 36px member names; 16px body text; Figma greens `#184634` and `#011c14`; and `#484848` for body copy. On widths at or below 900px, use a single-column layout, remove the desktop width constraint, and keep the profile images responsive.

```css
.team-section { /* section shell */ }
.team-section__intro { /* pinned desktop panel */ }
.team-section__profiles { /* scrollable profile column */ }
.team-section__profile { /* one member */ }
@media (max-width: 900px) { .team-section { /* one column */ } }
```

- [ ] **Step 5: Run the component tests, full checks, and inspect the behavior**

Run:

```bash
npm test -- --run src/components/TeamSection.test.tsx
npm test -- --run
npm run lint
npm run build
```

Inspect desktop: the intro remains pinned while both profile cards travel past it. Inspect mobile: intro, Guilherme, and Matheus read vertically with no pinning. Inspect reduced-motion: no pin or entrance animation runs.

- [ ] **Step 6: Commit the interaction and styles**

```bash
git add src/components/TeamSection.tsx src/components/TeamSection.test.tsx src/index.css
git commit -m "feat: animate interactive team section"
```
