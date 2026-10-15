import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import App from './App'

it('expõe CTAs para WhatsApp e agendamento', () => {
  render(<App />)
  expect(screen.getAllByRole('link', { name: /whatsapp/i })[0]).toHaveAttribute('href', 'https://wa.me/5511940111517')
  expect(screen.getAllByRole('link', { name: /agende/i })[0]).toHaveAttribute('href', 'https://sites.appbarber.com.br/distrito011barbershop-h8o?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAaeFdw9doF7onWqSC5t9Wckc6WaXCYTKuQQT-m748lw_tzYgStDDcbw5Gsj8Tw_aem_PU5BVLAmomHrJFuGxHwJlQ')
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
  expect(screen.getAllByRole('link', { name: 'Agende seu corte' })[0]).toHaveAttribute('href', 'https://sites.appbarber.com.br/distrito011barbershop-h8o?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAaeFdw9doF7onWqSC5t9Wckc6WaXCYTKuQQT-m748lw_tzYgStDDcbw5Gsj8Tw_aem_PU5BVLAmomHrJFuGxHwJlQ')
})

it('oferece um CTA exclusivo para agendar no ponto de conversão', () => {
  render(<App />)

  expect(screen.getByRole('heading', { name: 'Pronto para mudar o visual?' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Agendar meu horário' })).toHaveAttribute('href', 'https://sites.appbarber.com.br/distrito011barbershop-h8o?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAaeFdw9doF7onWqSC5t9Wckc6WaXCYTKuQQT-m748lw_tzYgStDDcbw5Gsj8Tw_aem_PU5BVLAmomHrJFuGxHwJlQ')
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
