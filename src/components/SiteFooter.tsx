import { MessageCircle } from 'lucide-react'
import { siteConfig } from '../config/site'

type FooterDetails = {
  address: string
  hours: string
  whatsappUrl: string
  instagramUrl: string
}

export default function SiteFooter({ details }: { details: FooterDetails }) {
  return (
    <footer className="site-footer">
      <section className="site-footer__cta" aria-labelledby="footer-cta-title">
        <div className="site-footer__cta-content">
          <h2 id="footer-cta-title">Seu próximo corte começa <strong>aqui.</strong></h2>
          <nav className="site-footer__cta-links" aria-label="Ações de contato">
            <a className="cta cta--gray" href={details.whatsappUrl} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
            <a className="cta cta--white" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">Agende seu corte</a>
          </nav>
        </div>
      </section>

      <div className="site-footer__details">
        <div className="site-footer__content">
          <div className="site-footer__meta">
            <address>{details.address}</address>
            <p>{details.hours}</p>
          </div>
          <nav className="site-footer__links" aria-label="Redes sociais">
            <a href={details.whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle aria-hidden="true" /></a>
            <a href={details.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </nav>
        </div>
        <p className="site-footer__brand" aria-label="Distrito zero onze">DISTRITO 011</p>
      </div>
    </footer>
  )
}
