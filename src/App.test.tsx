import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import App from './App'

it('expõe CTAs para WhatsApp e agendamento', () => {
  render(<App />)
  expect(screen.getAllByRole('link', { name: /whatsapp/i })[0]).toHaveAttribute('href', 'https://wa.me/5511940111517')
  expect(screen.getAllByRole('link', { name: /agende/i })[0]).toHaveAttribute('href', 'https://appbarber.com.br/')
})

it('mantém as seções existentes na nova ordem sem perder seus CTAs', () => {
  render(<App />)

  const pageText = document.body.textContent ?? ''
  const positions = [
    'Seu estilo.Seu distrito.',
    'Estilo pensado para você',
    'Seu momento começa antes do corte.',
    'Tudo que seu estilo precisa',
    'Pronto para mudar o visual?',
    'Seu estilo sempre em dia.',
  ].map((text) => pageText.indexOf(text))

  expect(positions.every((position) => position >= 0)).toBe(true)
  expect(positions).toEqual([...positions].sort((a, b) => a - b))
  expect(screen.getByRole('link', { name: 'Chamar no WhatsApp' })).toHaveAttribute('href', 'https://wa.me/5511940111517')
  expect(screen.getAllByRole('link', { name: 'Agende seu corte' })[0]).toHaveAttribute('href', 'https://appbarber.com.br/')
})
