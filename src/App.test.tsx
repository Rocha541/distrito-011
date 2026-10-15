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
    'Seu estilo nas mãos de quem entende',
    'Tudo que seu estilo precisa',
    'Pronto para mudar o visual?',
    'Seu estilo sempre em dia.',
  ].map((text) => pageText.indexOf(text))

  expect(positions.every((position) => position >= 0)).toBe(true)
  expect(positions).toEqual([...positions].sort((a, b) => a - b))
  expect(screen.getAllByRole('link', { name: 'Chamar no WhatsApp' })[0]).toHaveAttribute('href', 'https://wa.me/5511940111517')
  expect(screen.getAllByRole('link', { name: 'Agende seu corte' })[0]).toHaveAttribute('href', 'https://appbarber.com.br/')
})

it('oferece um CTA exclusivo para agendar no ponto de conversão', () => {
  render(<App />)

  expect(screen.getByRole('heading', { name: 'Pronto para mudar o visual?' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Agendar meu horário' })).toHaveAttribute('href', 'https://appbarber.com.br/')
})

it('expõe no footer os dados comerciais confirmados', () => {
  render(<App />)

  expect(screen.getByText('Av. Aimara, 527 | Embu das Artes')).toBeInTheDocument()
  expect(screen.getByText('Das 9h às 19h')).toBeInTheDocument()
  expect(screen.queryByText('Dinheiro, Pix e cartão')).not.toBeInTheDocument()
})

it('não exibe o selo de plano recorrente na seção de plano', () => {
  render(<App />)

  expect(screen.queryByText('Plano recorrente')).not.toBeInTheDocument()
})
