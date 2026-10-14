import { ArrowUpRight, CalendarDays, Camera, Globe, MapPin, MessageCircle } from 'lucide-react'
import { siteConfig } from '../config/site'
import cover from '../assets/figma/service-wide.png'

const links = [
  { label: 'Agende seu corte', detail: 'Escolha seu horário no AppBarber', href: siteConfig.bookingUrl, icon: CalendarDays, primary: true },
  { label: 'WhatsApp', detail: 'Fale com a gente', href: siteConfig.whatsappUrl, icon: MessageCircle, primary: false },
  { label: 'Instagram', detail: 'Cortes, referências e nosso dia a dia', href: siteConfig.instagramUrl, icon: Camera, primary: false },
  { label: 'Conheça nosso site', detail: 'Seu próximo estilo começa aqui', href: siteConfig.siteUrl, icon: Globe, primary: false },
] as const

export default function BioPage() {
  return (
    <main className="bio-page">
      <div className="bio-layout">
        <div className="bio-photo">
          <img src={cover} alt="Corte sendo finalizado na barbearia Distrito 011" fetchPriority="high" />
          <div className="bio-photo__caption"><span>CORTE. BARBA. IDENTIDADE.</span><span>011</span></div>
        </div>

        <div className="bio-content">
          <header className="bio-heading">
            <p className="bio-brand">DISTRITO 011</p>
            <h1>Seu estilo.<br />Seu distrito.</h1>
            <p className="bio-description">Corte, barba e cuidado nos detalhes.<br />Encontre seu próximo passo por aqui.</p>
          </header>

          <nav className="bio-links" aria-label="Links da Distrito 011">
            {links.map(({ label, detail, href, icon: Icon, primary }) => (
              <a className={`bio-link${primary ? ' bio-link--primary' : ''}`} href={href} key={label}
                {...(href.startsWith('https://') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <span className="bio-link__icon"><Icon aria-hidden="true" /></span>
                <span className="bio-link__copy"><strong>{label}</strong><span>{detail}</span></span>
                <ArrowUpRight className="bio-link__arrow" aria-hidden="true" />
              </a>
            ))}
          </nav>

          <footer className="bio-footer">
            <p><MapPin aria-hidden="true" />Embu das Artes, SP</p>
            <address>Av. Aimara, 527</address>
            <span className="bio-footer__signature">ESTILO É IDENTIDADE.</span>
          </footer>
        </div>
      </div>
    </main>
  )
}
