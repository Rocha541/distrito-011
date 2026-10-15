import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import SiteFooter from './SiteFooter'

it('mostra os dados comerciais fornecidos', () => {
  render(
    <SiteFooter
      details={{
        address: 'Av. Aimara, 527 | Embu das Artes',
        hours: 'Das 9h às 19h',
        whatsappUrl: 'https://wa.me/5511940111517',
        instagramUrl: 'https://www.instagram.com/barbeariadistrito011/',
      }}
    />,
  )

  expect(screen.getByText('Av. Aimara, 527 | Embu das Artes')).toBeInTheDocument()
  expect(screen.getByText('Das 9h às 19h')).toBeInTheDocument()
  expect(screen.getByText('© 2026 Distrito 011')).toBeInTheDocument()
  expect(screen.queryByText('Dinheiro, Pix e cartão')).not.toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Seu próximo corte começa aqui.' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Agende seu corte' })).toHaveAttribute('href', 'https://appbarber.com.br/')
  expect(screen.getByRole('link', { name: 'Falar no WhatsApp' })).toHaveAttribute('href', 'https://wa.me/5511940111517')
  expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', 'https://www.instagram.com/barbeariadistrito011/')
  expect(screen.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute('href', 'https://wa.me/5511940111517')
  expect(document.querySelector('.site-footer__cta')).toBeInTheDocument()
  expect(document.querySelector('.site-footer__details')).toBeInTheDocument()
  expect(document.querySelector('.site-footer__brand')).toHaveTextContent('DISTRITO 011')
  expect(document.querySelector('.site-footer__brand-wrap')).toBeInTheDocument()
})
