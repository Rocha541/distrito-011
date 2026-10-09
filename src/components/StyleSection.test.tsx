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
