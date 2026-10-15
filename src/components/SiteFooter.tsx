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
            <address>{details.address}</address>
            <p>{details.hours}</p>
            <p className="site-footer__copyright">© 2026 Distrito 011</p>
          </div>
          <nav className="site-footer__links" aria-label="Redes sociais">
            <a href={details.whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.5 5.9L.1 24l6.3-1.6a11.8 11.8 0 0 0 5.7 1.5h.1c6.5 0 11.8-5.3 11.8-11.9 0-3.2-1.2-6.1-3.5-8.5ZM12.1 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.9 9.9 0 1 1 8.3 4.6Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1s-.5-.1-.7.2-.8 1-.9 1.1-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.4.1-.6l.5-.5c.1-.2.2-.3.3-.5s0-.4 0-.5L9 6.9c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.7.4s-1 1-1 2.5 1 2.8.2 3.1c.2.2 2.6 4 6.2 5.6.9.4 1.6.7 2.2.9.9.3 1.7.2 2.3.1.7-.1 1.8-.8 2.1-1.5s.3-1.4.2-1.5-.3-.2-.6-.4Z" />
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
