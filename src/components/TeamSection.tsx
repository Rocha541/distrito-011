import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import guilhermeRibeiro from '../assets/figma/guilherme-ribeiro.png'
import matheusCosta from '../assets/figma/matheus-costa.png'
import { siteConfig } from '../config/site'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const professionals = [
  {
    name: 'Guilherme Ribeiro',
    role: 'Fundador da barbearia e especialista em visagismo masculino',
    description: 'Une técnica, experiência e percepção estética para criar cortes que valorizam os traços, a personalidade e o estilo de cada cliente. Seu trabalho vai além de seguir tendências: cada detalhe é pensado para construir uma imagem autêntica, equilibrada e feita para quem você é.',
    image: guilhermeRibeiro,
  },
  {
    name: 'Matheus Costa',
    role: 'Especialista em cortes modernos, fades e acabamento de precisão',
    description: 'Combina técnica e atenção aos detalhes para criar visuais marcantes e bem estruturados. Seu foco está em entender o estilo de cada cliente e entregar um corte atual, versátil e fácil de manter no dia a dia.',
    image: matheusCosta,
  },
] as const

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    const intro = introRef.current
    if (!section || !intro) return

    const media = gsap.matchMedia()

    media.add('(min-width: 1101px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top+=72',
          end: 'bottom bottom-=72',
          pin: intro,
          pinSpacing: false,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => media.revert()
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="team-section" aria-labelledby="team-title">
      <div ref={introRef} className="team-section__intro">
        <h2 id="team-title">Seu estilo nas mãos de quem entende</h2>
        <p>Cada corte começa com técnica, atenção e personalidade. Nosso time combina experiência e olhar apurado para criar um resultado que respeita seu estilo e valoriza quem você é.</p>
        <div className="team-section__cta-row">
          <a className="cta cta--gray" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
          <a className="cta cta--green" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">Agende seu corte</a>
        </div>
      </div>

      <div className="team-section__profiles">
        {professionals.map((professional) => (
          <div className="team-section__profile-stage" key={professional.name}>
            <article className="team-section__profile">
              <img src={professional.image} alt={professional.name} />
              <h3>{professional.name}</h3>
              <p><strong>{professional.role}</strong> {professional.description}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}
