import { useEffect, useMemo, useRef, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Works from './components/Works.jsx'
import Strengths from './components/Strengths.jsx'
import Contact from './components/Contact.jsx'
import WorkModal from './components/WorkModal.jsx'
import Grainient from './components/Grainient.jsx'
import { navLinks } from './data/content.js'
import { grainientProps } from './data/grainient.js'
import { prefersReducedMotion, useActiveSection } from './hooks/useScroll.js'
import { useSiteAnimations } from './animations/siteAnimations.js'

export default function App() {
  // memo 一下：否则每次渲染都会生成新数组，导致 useActiveSection 的 effect 反复重建
  const sectionIds = useMemo(() => navLinks.map((l) => l.href.slice(1)), [])
  const active = useActiveSection(sectionIds)

  // 当前打开的项目详情，null 表示弹窗关闭
  const [activeWork, setActiveWork] = useState(null)

  // 系统开了"减少动态效果"时，不启用会持续运动的 WebGL 背景
  const reduceMotion = useMemo(() => prefersReducedMotion(), [])

  // 动效作用域：GSAP 的所有选择器都限制在这层之内
  const pageRef = useRef(null)
  useSiteAnimations(pageRef)

  // 回到顶部时不要保留浏览器恢复的滚动位置
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  return (
    <>
      {/* 全站背景：Grainient 柔和渐变 + 胶片颗粒。
          固定在视口、z-index 压在最底层，所有内容都浮在它上面。
          放在 .page 之外，所以弹窗打开时它不会被一起模糊。 */}
      {reduceMotion ? null : (
        <div className="page-bg" aria-hidden="true">
          <Grainient {...grainientProps} />
        </div>
      )}

      <div className="grain" aria-hidden="true" />

      {/* 弹窗打开时给整页加高斯模糊。
          弹窗渲染在 .page 之外，所以不会被一起模糊。 */}
      <div className="page" ref={pageRef} data-blurred={activeWork ? '' : undefined}>
        <Nav active={active} />
        <main>
          <Hero />
          <Marquee />
          <Works onOpenWork={setActiveWork} />
          <Strengths />
          <Contact />
        </main>
      </div>

      {activeWork ? (
        <WorkModal item={activeWork} onClose={() => setActiveWork(null)} />
      ) : null}
    </>
  )
}
