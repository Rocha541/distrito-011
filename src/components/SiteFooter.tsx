import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
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
            <a className="cta cta--white" href={details.whatsappUrl} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
            <a className="cta cta--white" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">Agende seu corte</a>
          </nav>
        </div>
      </section>

      <div className="site-footer__details">
        <div className="site-footer__content">
          <div className="site-footer__meta">
            <div>
              <strong>Endereço</strong>
              <address>{details.address}</address>
            </div>
            <div>
              <strong>Horários</strong>
              <p>{details.hours}</p>
            </div>
            <p className="site-footer__copyright">© 2026 Distrito 011</p>
          </div>
          <nav className="site-footer__links" aria-label="Redes sociais">
            <a href={details.whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <FaWhatsapp aria-hidden="true" />
            </a>
            <a href={details.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram aria-hidden="true" />
            </a>
          </nav>
        </div>
        <div className="site-footer__brand-wrap">
          <p className="site-footer__brand" aria-label="Distrito zero onze">DISTRITO 011</p>
        </div>
      </div>
    </footer>
  )
}
