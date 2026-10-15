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
  expect(screen.getByRole('link', { name: 'Agende seu corte' })).toHaveAttribute('href', 'https://sites.appbarber.com.br/distrito011barbershop-h8o?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAaeFdw9doF7onWqSC5t9Wckc6WaXCYTKuQQT-m748lw_tzYgStDDcbw5Gsj8Tw_aem_PU5BVLAmomHrJFuGxHwJlQ')
  expect(document.querySelectorAll('.team-section__profile-stage')).toHaveLength(2)
  expect(document.querySelector('.team-section__intro-stage')).toBeInTheDocument()
})
