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
      <div className="site-footer__content">
        <p className="site-footer__brand">DISTRITO 011</p>
        <address>{details.address}</address>
        <p>{details.hours}</p>
        <p>{details.paymentMethods}</p>
        <nav className="site-footer__links" aria-label="Contato e redes sociais">
          <a href={details.whatsappUrl} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
          <a href={details.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
        </nav>
      </div>
    </footer>
  )
}
