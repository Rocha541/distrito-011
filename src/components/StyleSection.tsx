import { useState } from 'react'
import heroLeft from '../assets/figma/hero-left.png'
import styleLeft from '../assets/figma/style-left.png'
import styleRight from '../assets/figma/style-right.png'
import { siteConfig } from '../config/site'

const styleCards = [
  { image: styleLeft, title: 'Textured Fade', description: 'Textura no topo, laterais limpas e um acabamento que valoriza o movimento natural do cabelo.' },
  { image: heroLeft, title: 'Curly Fade', description: 'Ideal para cabelos ondulados, cacheados ou crespos, valorizando a textura sem deixar o corte pesado.' },
  { image: styleRight, title: 'Low Fade', description: 'Transição suave nas laterais, desenho preciso e um visual moderno que funciona em diferentes rotinas.' },
] as const

export default function StyleSection() {
  const [activeStyle, setActiveStyle] = useState<number | null>(null)

  return (
    <section className="style-intro" id="estilos">
      <div className="style-pin">
        <div className="section-heading">
          <h2>Estilo pensado para você</h2>
          <p>Na Distrito, cada corte é pensado para valorizar o seu estilo, seu rosto e sua personalidade. Do clássico ao moderno, ajudamos você a encontrar o visual que realmente <strong>combina com você.</strong></p>
          <a className="cta cta--white" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">Agende seu corte</a>
        </div>
        <div className="style-showcase">
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
