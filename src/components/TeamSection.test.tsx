import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import TeamSection from './TeamSection'

it('apresenta os profissionais e CTAs de contato da equipe', () => {
  render(<TeamSection />)

  expect(screen.getByRole('heading', { name: 'Seu estilo nas mãos de quem entende' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Guilherme Ribeiro' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Matheus Costa' })).toBeInTheDocument()
  expect(screen.getByRole('img', { name: 'Guilherme Ribeiro' })).toBeInTheDocument()
  expect(screen.getByRole('img', { name: 'Matheus Costa' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Chamar no WhatsApp' })).toHaveAttribute('href', 'https://wa.me/5511940111517')
  expect(screen.getByRole('link', { name: 'Agende seu corte' })).toHaveAttribute('href', 'https://appbarber.com.br/')
  expect(document.querySelectorAll('.team-section__profile-stage')).toHaveLength(2)
  expect(document.querySelector('.team-section__intro-stage')).toBeInTheDocument()
})
