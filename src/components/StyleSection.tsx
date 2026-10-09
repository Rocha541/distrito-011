import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroLeft from '../assets/figma/hero-left.png'
import styleLeft from '../assets/figma/style-left.png'
import styleRight from '../assets/figma/style-right.png'
import { siteConfig } from '../config/site'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const styleCards = [
  { image: styleLeft, title: 'Textured Fade', description: 'Textura no topo, laterais limpas e um acabamento que valoriza o movimento natural do cabelo.' },
  { image: heroLeft, title: 'Curly Fade', description: 'Ideal para cabelos ondulados, cacheados ou crespos, valorizando a textura sem deixar o corte pesado.' },
  { image: styleRight, title: 'Low Fade', description: 'Transição suave nas laterais, desenho preciso e um visual moderno que funciona em diferentes rotinas.' },
] as const

export default function StyleSection() {
  const [activeStyle, setActiveStyle] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const showcaseRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const showcase = showcaseRef.current
    if (!section || !pin || !showcase) return

    const media = gsap.matchMedia()

    const createScrollTimeline = (end: string, finalY: number) => {
      gsap.set(showcase, { yPercent: 72 })
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end,
          pin,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      timeline.to(showcase, { yPercent: finalY, ease: 'none' })
    }

    media.add('(min-width: 701px) and (prefers-reduced-motion: no-preference)', () => {
      createScrollTimeline('+=150%', -18)
    })

    media.add('(max-width: 700px) and (prefers-reduced-motion: no-preference)', () => {
      createScrollTimeline('+=110%', -12)
    })

    media.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(showcase, { clearProps: 'transform' })
    })

    return () => media.revert()
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="style-intro" id="estilos">
      <div ref={pinRef} className="style-pin">
        <div className="section-heading">
          <h2>Estilo pensado para você</h2>
          <p>Na Distrito, cada corte é pensado para valorizar o seu estilo, seu rosto e sua personalidade. Do clássico ao moderno, ajudamos você a encontrar o visual que realmente <strong>combina com você.</strong></p>
          <a className="cta cta--white" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">Agende seu corte</a>
        </div>
        <div ref={showcaseRef} className="style-showcase">
          {styleCards.map((style, index) => (
            <button
              className={`style-card${activeStyle === index ? ' is-active' : ''}`}
              key={style.title}
              onClick={() => setActiveStyle(activeStyle === index ? null : index)}
              type="button"
              aria-pressed={activeStyle === index}
            >
              <img src={style.image} alt={`${style.title}: referência de corte masculino`} />
              <span className="style-card__overlay">
                <strong>{style.title}</strong>
                <span>{style.description}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
