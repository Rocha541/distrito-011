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
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M8.4 8.1c.2-.5.6-.6 1-.4l1 .5c.3.1.4.4.3.7l-.4 1c-.1.2 0 .4.1.6.5.9 1.3 1.7 2.2 2.2.2.1.4.2.6.1l1-.4c.3-.1.6 0 .7.3l.5 1c.2.4 0 .8-.4 1-.7.3-1.4.4-2.1.1-1.4-.6-2.7-1.6-3.7-2.7-1-1-2-2.3-2.6-3.7-.3-.7-.2-1.4.1-2.1l.5-.7Z" />
                <path d="m7.1 17.3-1.3 1.4 2-.5" />
              </svg>
            </a>
            <a href={details.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
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
