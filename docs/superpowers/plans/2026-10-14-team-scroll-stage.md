# Team Scroll Stages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Present one team professional at a time in the desktop scroll experience while keeping the left introduction pinned and aligned to the page container.

**Architecture:** Keep `TeamSection` as the owner of its GSAP ScrollTrigger. The CSS changes establish a full-width two-column container and viewport-sized profile stages; the existing semantic article structure stays unchanged.

**Tech Stack:** React 19, TypeScript, GSAP ScrollTrigger, CSS, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-10-14-team-scroll-stage-design.md`

## Global Constraints

- Do not modify any existing landing-page section outside `TeamSection`.
- Pin only at widths above 900px and only with `prefers-reduced-motion: no-preference`.
- Preserve the local Figma portraits and their accessible alt text.

---

### Task 1: Protect the profile-stage structure

**Files:**
- Modify: `src/components/TeamSection.test.tsx`
- Modify: `src/components/TeamSection.tsx`

**Interfaces:**
- Consumes: the existing `TeamSection` component and its two rendered `article.team-section__profile` elements.
- Produces: an observable `team-section__profile-stage` contract for CSS viewport staging.

- [ ] **Step 1: Write the failing test**

```tsx
expect(document.querySelectorAll('.team-section__profile-stage')).toHaveLength(2)
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/components/TeamSection.test.tsx`

Expected: FAIL because no profile-stage elements are rendered.

- [ ] **Step 3: Write minimal implementation**

```tsx
<div className="team-section__profile-stage">
  <article className="team-section__profile">...</article>
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run src/components/TeamSection.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/components/TeamSection.tsx src/components/TeamSection.test.tsx
git commit -m "test: define team profile scroll stages"
```

### Task 2: Align and stage the desktop team scroll

**Files:**
- Modify: `src/components/TeamSection.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `team-section__profile-stage` wrappers from Task 1 and the existing `introRef`.
- Produces: full-width profile stages with a ScrollTrigger pin lasting through both profiles.

- [ ] **Step 1: Adjust the ScrollTrigger bounds**

```tsx
end: () => `+=${section.offsetHeight - window.innerHeight}`,
pin: intro,
pinSpacing: false,
```

- [ ] **Step 2: Update the section geometry**

```css
.team-section { grid-template-columns: minmax(360px, 470px) minmax(0, 1fr); max-width: 1728px; }
.team-section__profile-stage { min-height: 100vh; display: flex; align-items: center; }
.team-section__profile { width: min(100%, 706px); }
```

- [ ] **Step 3: Keep the mobile fallback unpinned**

```css
@media (max-width: 900px) {
  .team-section__profile-stage { min-height: auto; display: block; }
}
```

- [ ] **Step 4: Run the full validation**

Run: `npm test -- --run; npm run lint; npm run build`

Expected: all tests pass, lint reports no diagnostics, and the production build completes.

- [ ] **Step 5: Commit**

```powershell
git add src/components/TeamSection.tsx src/index.css
git commit -m "fix: stage team profiles during scroll"
```
