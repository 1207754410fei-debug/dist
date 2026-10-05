import { contact, profile, marqueeItems } from '../data/content.js'
import { IconArrow, IconArrowUp } from './icons.jsx'

export default function Contact() {
  return (
    <section className="section section--contact" id="contact">
      <div className="contact__glow" aria-hidden="true" />

      <div className="shell contact__inner">
        <div className="contact__meta">
          <span className="mono contact__index">{contact.index}</span>
          <span className="contact__rule" aria-hidden="true" />
          <span className="mono">{contact.titleEn}</span>
        </div>

        <h2 className="contact__headline">
          {contact.headline}
        </h2>
        <p className="contact__sub">
          {contact.sub}
        </p>

        <a className="contact__email" href={`mailto:${profile.email}`}>
          <span>{profile.email}</span>
          <IconArrow width={30} height={30} />
        </a>

        <div className="contact__grid">
          {contact.items.map((item) => (
            <div className="contact__cell" key={item.k}>
              <span className="mono contact__cellK">{item.k}</span>
              {item.href ? (
                <a href={item.href}>{item.v}</a>
              ) : (
                <span>{item.v}</span>
              )}
            </div>
          ))}
        </div>

        <div className="contact__strip" aria-hidden="true">
          <div className="marquee__track marquee__track--slow">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span className="marquee__item" key={`${item}-${i}`}>
                {item}
                <i />
              </span>
            ))}
          </div>
        </div>

        <footer className="contact__footer">
          <span>{contact.footerNote}</span>
          <a className="contact__top" href="#top">
            <IconArrowUp width={16} height={16} />
            <span>回到顶部</span>
          </a>
        </footer>
      </div>
    </section>
  )
}
