import { hero } from '../data/content.js'
import { IconArrow } from './icons.jsx'

export default function Hero() {
  return (
    <section className="hero" id="top">
      {/* 首屏居中的柔和光晕。绝对定位、不参与排版，
          只是给渐变底加一层隐隐可见的暖调氛围 */}
      <div className="hero__orbWrap" aria-hidden="true">
        <div className="hero__orb" />
        <span className="hero__orbShadow" />
      </div>

      <div className="shell hero__inner">
        <div className="hero__bottom">
          <div className="hero__lead">
            <p className="hero__kicker">
              <span className="pulse" aria-hidden="true" />
              <span>{hero.kicker}</span>
              <i aria-hidden="true" />
              <span className="mono hero__kickerMeta">{hero.kickerMeta}</span>
            </p>

            {/* 每行单独包一层 overflow:hidden 的遮罩，
                GSAP 让行内文字从遮罩下方推上来 */}
            <h1 className="hero__title">
              {hero.headline.map((line) => (
                <span className="hero__titleLine" key={line}>
                  <span>{line}</span>
                </span>
              ))}
            </h1>

            <p className="hero__lede">
              {hero.lede}
            </p>

            <div className="hero__actions">
              <a className="btn btn--solid" href={hero.primaryCta.href}>
                <span>{hero.primaryCta.label}</span>
                <IconArrow width={18} height={18} />
              </a>
              <a className="btn btn--ghost" href={hero.secondaryCta.href}>
                <span>{hero.secondaryCta.label}</span>
              </a>
            </div>
          </div>

          <aside className="hero__aside">
            <p className="hero__asideText">
              {hero.aside}
            </p>
            <ul className="hero__tags">
              {hero.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
