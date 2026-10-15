import { siteConfig } from '../config/site'

export default function BookingCtaSection() {
  return (
    <section className="booking-cta-section" aria-labelledby="booking-cta-title">
      <div className="booking-cta-section__content">
        <h2 id="booking-cta-title">Pronto para mudar o visual?</h2>
        <p>Escolha seu horário e venha viver a experiência Distrito 011.</p>
        <a className="cta cta--green booking-cta-section__link" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">
          Agendar meu horário
        </a>
      </div>
    </section>
  )
}
