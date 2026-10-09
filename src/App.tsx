import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import galleryBottom from './assets/figma/gallery-bottom.png'
import galleryMiddle from './assets/figma/gallery-middle.png'
import galleryTop from './assets/figma/gallery-top.png'
import heroLeft from './assets/figma/hero-left.png'
import heroRight from './assets/figma/hero-right.png'
import serviceWide from './assets/figma/service-wide.png'
import styleCenter from './assets/figma/style-center.png'
import styleLeft from './assets/figma/style-left.png'
import styleRight from './assets/figma/style-right.png'
import StyleSection from './components/StyleSection'
import { siteConfig } from './config/site'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type CtaProps = {
  children: ReactNode
  href: string
  variant?: 'green' | 'gray' | 'white'
}

function Cta({ children, href, variant = 'green' }: CtaProps) {
  return (
    <a className={`cta cta--${variant}`} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

const services = [
  ['Corte Masculino', 'Um corte pensado para valorizar seu rosto, seu estilo e sua rotina, com acabamento preciso e finalização personalizada.'],
  ['Barba Completa', 'Desenho, alinhamento e acabamento para deixar a barba mais definida, equilibrada e combinando melhor com o seu rosto.'],
  ['Acabamento', 'Ideal para manter contornos, costeletas e detalhes sempre alinhados entre um corte completo e outro.'],
  ['Consultoria de Estilo', 'Ajudamos você a escolher o corte que mais combina com seu cabelo, formato do rosto e estilo pessoal.'],
] as const

export default function App() {
  const pageRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const experience = experienceRef.current
    if (!experience) return

    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const heroTimeline = gsap.timeline({ defaults: { duration: .85, ease: 'power3.out' } })

      heroTimeline
        .from('.site-header', { y: -24, opacity: 0, duration: .65 })
        .from('.hero-copy > *', { y: 34, opacity: 0, stagger: .12 }, '-=.25')
        .from('.portrait--hero-left', { x: -110, opacity: 0 }, '-=.55')
        .from('.portrait--hero-right', { x: 110, opacity: 0 }, '<')
        .from('.hero-trio .portrait', { y: 110, opacity: 0, stagger: .1 }, '-=.65')

      const experienceTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: experience,
          start: 'top 72%',
          toggleActions: window.innerWidth <= 700 ? 'play none none none' : 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      })

      experienceTimeline
        .from('.experience-gallery img', { y: window.innerWidth <= 700 ? 0 : 110, opacity: 0, duration: 1, stagger: .14 })
        .from('.experience-copy > *', { y: 42, opacity: 0, duration: .75, stagger: .1 }, '-=.65')
    })

    return () => media.revert()
  }, { scope: pageRef })

  return (
    <div ref={pageRef} className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio">DISTRITO 011</a>
        <nav aria-label="Navegação principal">
          <a href="#inicio">Início</a>
          <a href="#servicos">Serviços</a>
          <a href="#estilos">Estilos</a>
        </nav>
        <Cta href={siteConfig.bookingUrl}>Agende seu corte</Cta>
      </header>

      <main>
        <section className="hero-section" id="inicio">
          <img className="portrait portrait--hero-left" src={heroLeft} alt="Modelo com corte masculino clássico" />
          <img className="portrait portrait--hero-right" src={heroRight} alt="Modelo com corte masculino texturizado" />
          <div className="hero-copy">
            <h1>Seu estilo.<br />Seu distrito.</h1>
            <p>Corte, barba e cuidado nos detalhes para quem entende que estilo não é só aparência, <strong>é identidade.</strong></p>
            <div className="cta-row">
              <Cta href={siteConfig.whatsappUrl} variant="gray">Chamar no WhatsApp</Cta>
              <Cta href={siteConfig.bookingUrl}>Agende seu corte</Cta>
            </div>
          </div>
          <div className="hero-trio" aria-label="Referências de estilos de corte">
            <img className="portrait portrait--left" src={styleLeft} alt="Modelo com corte fade" />
            <img className="portrait portrait--center" src={styleCenter} alt="Modelo com barba e corte baixo" />
            <img className="portrait portrait--right" src={styleRight} alt="Modelo com corte lateral baixo" />
          </div>
        </section>

        <StyleSection />

        <section ref={experienceRef} className="experience-section">
          <div className="experience-gallery" aria-label="Ambiente e atendimento da barbearia">
            <img src={galleryTop} alt="Atendimento na barbearia" />
            <img src={galleryMiddle} alt="Detalhe do espaço da barbearia" />
            <img src={galleryBottom} alt="Finalização de um corte" />
          </div>
          <div className="experience-copy">
            <h2>Seu momento começa antes do corte.</h2>
            <p>Na Distrito, cada detalhe <strong>foi pensado para transformar uma rotina em uma experiência.</strong> Atendimento próximo, ambiente confortável e profissionais que <strong>entendem o que funciona para você.</strong></p>
            <div className="cta-row">
              <Cta href={siteConfig.whatsappUrl} variant="gray">Chamar no WhatsApp</Cta>
              <Cta href={siteConfig.bookingUrl}>Agende seu corte</Cta>
            </div>
          </div>
        </section>

        <section className="services-section" id="servicos">
          <div className="services-heading">
            <div><h2>Tudo que seu estilo precisa</h2><p>Corte, barba e cuidados pensados para manter seu visual sempre em dia.</p></div>
            <Cta href={siteConfig.bookingUrl} variant="white">Agende seu corte</Cta>
          </div>
          <div className="services-grid">
            <article className="service-card service-card--wide"><h3>{services[0][0]}</h3><p>{services[0][1]}</p></article>
            <div className="service-photo"><img src={serviceWide} alt="Barbeiro realizando um corte" /></div>
            {services.slice(1).map(([title, description]) => <article className="service-card" key={title}><h3>{title}</h3><p>{description}</p></article>)}
          </div>
        </section>
      </main>
    </div>
  )
}
