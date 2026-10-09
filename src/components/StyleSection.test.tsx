import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, it, vi } from 'vitest'
import StyleSection from './StyleSection'

const gsapMocks = vi.hoisted(() => {
  const timelineTo = vi.fn()
  return {
    timelineTo,
    timelineFactory: vi.fn(() => ({ to: timelineTo })),
  }
})

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    matchMedia: () => ({
      add: (_query: string, callback: () => void) => callback(),
      revert: vi.fn(),
    }),
    timeline: gsapMocks.timelineFactory,
    set: vi.fn(),
  },
}))

vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }))

vi.mock('@gsap/react', async () => {
  const React = await import('react')
  return {
    useGSAP: (callback: () => void) => React.useLayoutEffect(callback, [callback]),
  }
})

beforeEach(() => {
  gsapMocks.timelineFactory.mockClear()
  gsapMocks.timelineTo.mockClear()
})

it('revela um estilo sem mover a estrutura do card', async () => {
  const user = userEvent.setup()
  render(<StyleSection />)

  const card = screen.getByRole('button', { name: /curly fade/i })
  expect(card).toHaveAttribute('aria-pressed', 'false')
  await user.click(card)
  expect(card).toHaveAttribute('aria-pressed', 'true')
  expect(document.querySelector('.style-pin')).toBeInTheDocument()
  expect(document.querySelector('.style-showcase')).toBeInTheDocument()
  expect(document.querySelector('.style-pin')).toContainElement(document.querySelector('.section-heading'))
  expect(document.querySelector('.style-pin')).toContainElement(document.querySelector('.style-showcase'))
})

it('fixa a seção por 150vh e move somente a galeria', () => {
  render(<StyleSection />)

  expect(gsapMocks.timelineFactory).toHaveBeenCalledWith({
    scrollTrigger: expect.objectContaining({
      trigger: expect.any(HTMLElement),
      pin: expect.any(HTMLElement),
      scrub: true,
      end: '+=150%',
      invalidateOnRefresh: true,
    }),
  })
  expect(gsapMocks.timelineTo).toHaveBeenCalledWith(
    expect.any(HTMLElement),
    expect.objectContaining({ yPercent: expect.any(Number), ease: 'none' }),
  )
})
