import { siteConfig } from '../config/site'

type FooterDetails = {
  address: string
  hours: string
  paymentMethods: string
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
            <a href={details.whatsappUrl} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
            <a href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">Agende seu corte</a>
          </nav>
        </div>
      </section>

      <div className="site-footer__details">
        <div className="site-footer__content">
          <div className="site-footer__meta">
            <address>{details.address}</address>
            <p>{details.hours}</p>
            <p>{details.paymentMethods}</p>
          </div>
          <nav className="site-footer__links" aria-label="Redes sociais">
            <a href={details.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          </nav>
        </div>
        <p className="site-footer__brand" aria-label="Distrito zero onze">DISTRITO 011</p>
      </div>
    </footer>
  )
}
