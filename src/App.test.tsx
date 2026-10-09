import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import App from './App'

it('expõe CTAs para WhatsApp e agendamento', () => {
  render(<App />)
  expect(screen.getAllByRole('link', { name: /whatsapp/i })[0]).toHaveAttribute('href', 'https://wa.me/5511940111517')
  expect(screen.getAllByRole('link', { name: /agendar/i })[0]).toHaveAttribute('href', 'https://appbarber.com.br/')
})
