import { profile, navLinks } from '../data/content.js'
import { useScrollDirection } from '../hooks/useScroll.js'
import { IconArrowUpRight } from './icons.jsx'

export default function Nav({ active }) {
  // solid：滚过首屏顶部后换成磨砂实底；hidden：向下滚动时收起
  const { solid, hidden } = useScrollDirection()

  return (
    <header className={`nav ${solid ? 'is-solid' : ''} ${hidden ? 'is-hidden' : ''}`}>
      <div className="nav__inner shell">
        <a className="nav__brand" href="#top" aria-label={`${profile.nameZh} 作品集首页`}>
          <span className="nav__mark" aria-hidden="true">
            严
          </span>
          <span className="nav__brandText">
            <b>{profile.nameZh}</b>
            <i>{profile.nameEn}</i>
          </span>
        </a>

        <div className="nav__right">
          <nav className="nav__links" aria-label="主导航">
            {navLinks.map((link) => {
              const id = link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={active === id ? 'is-active' : undefined}
                >
                  <em>{link.index}</em>
                  <span>{link.label}</span>
                </a>
              )
            })}
          </nav>

          <span className="nav__divider" aria-hidden="true" />

          <a className="nav__cta" href="#contact">
            <span>联系我</span>
            <IconArrowUpRight width={15} height={15} />
          </a>
        </div>
      </div>
    </header>
  )
}
