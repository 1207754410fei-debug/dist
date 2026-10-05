import { strengths } from '../data/content.js'
import SectionHead from './SectionHead.jsx'
import { iconMap } from './icons.jsx'

export default function Strengths() {
  return (
    <section className="section section--strengths" id="strengths">
      <div className="shell">
        <SectionHead
          index={strengths.index}
          title={strengths.title}
          titleEn={strengths.titleEn}
          intro={strengths.intro}
        />

        <div className="cards">
          {strengths.items.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <article className="card" key={item.title}>
                <div className="card__top">
                  <span className="card__icon">
                    <Icon width={22} height={22} />
                  </span>
                  <span className="mono card__index">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="card__title">{item.title}</h3>
                <p className="mono card__en">{item.en}</p>
                <p className="card__desc">{item.desc}</p>
                <ul className="card__tags">
                  {item.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
