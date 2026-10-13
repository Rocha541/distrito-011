import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import SiteFooter from './SiteFooter'

it('mostra os dados comerciais fornecidos', () => {
  render(
    <SiteFooter
      details={{
        address: 'Av. Aimara, 527 | Embu das Artes',
        hours: 'Das 9h às 19h',
        paymentMethods: 'Dinheiro, Pix e cartão',
        whatsappUrl: 'https://wa.me/5511940111517',
        instagramUrl: 'https://www.instagram.com/barbeariadistrito011/',
      }}
    />,
  )

  expect(screen.getByText('Av. Aimara, 527 | Embu das Artes')).toBeInTheDocument()
  expect(screen.getByText('Das 9h às 19h')).toBeInTheDocument()
  expect(screen.getByText('Dinheiro, Pix e cartão')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Falar no WhatsApp' })).toHaveAttribute('href', 'https://wa.me/5511940111517')
  expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', 'https://www.instagram.com/barbeariadistrito011/')
})
