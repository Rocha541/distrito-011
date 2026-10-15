import { describe, expect, it } from 'vitest'
import { siteConfig } from './site'

describe('siteConfig', () => {
  it('centraliza os destinos de contato e agendamento', () => {
    expect(siteConfig.whatsappUrl).toBe('https://wa.me/5511940111517')
    expect(new URL(siteConfig.bookingUrl).protocol).toBe('https:')
  })
})
