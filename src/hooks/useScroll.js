import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * 监听页面滚动，供导航栏做「吸顶变实 / 向下收起」。
 *
 * 性能要点：只对外暴露两个布尔量，并且在值真正翻转时才更新 state。
 * 如果每帧都 setState 一个新对象，导航栏会以 60fps 重渲染，纯属浪费。
 */
export function useScrollDirection() {
  const [state, setState] = useState({ solid: false, hidden: false })
  const last = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const update = () => {
      ticking.current = false
      const y = window.scrollY
      const solid = y > 48
      const hidden = y > 240 && y > last.current + 4
      last.current = y
      // 返回值与上一帧相同的话 React 会直接跳过重渲染
      setState((prev) => (prev.solid === solid && prev.hidden === hidden ? prev : { solid, hidden }))
    }

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return state
}

/**
 * 根据视口中心位置判断当前所在板块，用于导航高亮。
 *
 * 性能要点：各板块的 offsetTop 只在布局可能变化时（初次挂载 / resize）量一次并缓存。
 * 滚动过程中直接读缓存值——否则每帧 getElementById + offsetTop 会强制同步重排。
 */
export function useActiveSection(ids) {
  // 初始为 null：停在首页 Hero 时，导航里不应该有高亮项
  const [active, setActive] = useState(null)
  const offsets = useRef([])
  const ticking = useRef(false)

  useEffect(() => {
    const measure = () => {
      offsets.current = ids
        .map((id) => {
          const el = document.getElementById(id)
          return el ? { id, top: el.offsetTop } : null
        })
        .filter(Boolean)
    }

    const update = () => {
      ticking.current = false
      const probe = window.scrollY + window.innerHeight * 0.38
      let current = null
      for (const item of offsets.current) {
        if (item.top <= probe) current = item.id
      }
      setActive(current)
    }

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(update)
    }

    const onResize = () => {
      measure()
      update()
    }

    measure()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [ids])

  return active
}

/**
 * 元素接近视口时返回 true（只触发一次）。
 * 用来把重资源推迟到真正需要时再加载——比如首屏之外的作品轮播，
 * 它会在挂载瞬间一次性拉取全部作品图并建立 WebGL 上下文。
 */
export function useInView(ref, rootMargin = '600px', triggerOnScroll = false) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return undefined
    }

    let onScroll = null
    const activate = () => {
      setInView(true)
      io.disconnect()
      if (onScroll) window.removeEventListener('scroll', onScroll)
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) activate()
    }, { rootMargin })

    io.observe(el)

    // 兜底触发：用户一旦开始往下滚，就立刻解除延迟。
    // 即使 IntersectionObserver 因为某些极端视口尺寸没触发，
    // 也不会出现"滚到作品区却一片空白"的情况。
    if (triggerOnScroll) {
      onScroll = () => {
        if (window.scrollY > 80) activate()
      }
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    return () => {
      io.disconnect()
      if (onScroll) window.removeEventListener('scroll', onScroll)
    }
  }, [ref, rootMargin, triggerOnScroll])

  return inView
}

export { prefersReducedMotion }
