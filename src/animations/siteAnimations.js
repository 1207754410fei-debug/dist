import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* 统一缓动：expo / power 系起步快、收尾长，
   有"重量感"但不回弹，避免廉价弹跳。 */
const EASE = 'expo.out'
const EASE_SOFT = 'power3.out'

/**
 * 让 GSAP 接管某个元素之前，先临时关掉它自身的 CSS transition。
 * 否则 GSAP 每帧写入的 transform 会被 CSS 过渡二次拖拽，动画会糊。
 * 返回一个恢复函数，在动画结束后把 :hover 的过渡交还回去。
 */
function withoutTransition(elements) {
  elements.forEach((el) => {
    el.style.transition = 'none'
  })
  return () =>
    elements.forEach((el) => {
      el.style.transition = ''
    })
}

/* =========================================================
   1. 首屏 opening animation
   一次完整的开场：导航落位 → 小标签推出 → 标题两行在遮罩内
   从下方推上来（带一点纵向拉伸后归位）→ 正文 / 按钮 / 右侧说明 / 标签依次跟上
   ========================================================= */
function buildOpening() {
  const tl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.12 })

  // 背景光晕最早起手，慢慢放大到稳定
  gsap.from('.hero__orbWrap', { opacity: 0, duration: 1.8, ease: EASE_SOFT }, 0)
  gsap.from('.hero__orb', { scale: 0.84, duration: 2.1, ease: EASE_SOFT }, 0)

  tl.from('.nav__inner', { yPercent: -130, opacity: 0, duration: 1.05 })
    .from('.hero__kicker', { yPercent: 120, opacity: 0, duration: 1.0 }, '-=0.72')
    // 主标题：遮罩揭开 + 位移 + 纵向压缩后归位
    .from(
      '.hero__titleLine > span',
      {
        yPercent: 122,
        scaleY: 1.28,
        transformOrigin: '50% 100%',
        duration: 1.55,
        stagger: 0.13,
      },
      '-=0.86'
    )
    .from('.hero__lede', { y: 34, opacity: 0, duration: 1.05 }, '-=1.1')
    .from('.hero__actions', { y: 26, opacity: 0, duration: 0.9 }, '-=0.86')
    .from('.hero__asideText', { y: 30, opacity: 0, duration: 1.0 }, '-=1.0')
    .from('.hero__tags li', { y: 16, opacity: 0, duration: 0.7, stagger: 0.055 }, '-=0.78')
}

/* =========================================================
   2. 每个模块的标题进场
   英文标签先小幅落位，随后大标题逐字从遮罩下方大幅推上来，
   最后右侧说明文字跟上。
   ========================================================= */
function buildSectionHeads() {
  gsap.utils.toArray('.secHead').forEach((head) => {
    const meta = head.querySelector('.secHead__meta')
    const chars = head.querySelectorAll('.secHead__char')
    const intro = head.querySelector('.secHead__intro')

    const tl = gsap.timeline({
      defaults: { ease: EASE },
      scrollTrigger: { trigger: head, start: 'top 84%', once: true },
    })

    if (meta) tl.from(meta, { y: 22, opacity: 0, duration: 0.9 })
    if (chars.length) {
      tl.from(chars, { yPercent: 128, duration: 1.25, stagger: 0.045 }, '-=0.5')
    }
    if (intro) tl.from(intro, { y: 28, opacity: 0, duration: 1.0 }, '-=0.9')
  })
}

/* =========================================================
   3. 精选项目：轮播进场 + 轻微视差
   ========================================================= */
function buildWorks() {
  const stage = document.querySelector('.works__stage')
  if (!stage) return

  gsap.from(stage, {
    y: 96,
    opacity: 0,
    scale: 0.975,
    duration: 1.5,
    ease: EASE,
    scrollTrigger: { trigger: stage, start: 'top 86%', once: true },
  })

  gsap.from('.works__hint', {
    y: 18,
    opacity: 0,
    duration: 0.9,
    ease: EASE_SOFT,
    scrollTrigger: { trigger: '.works__hint', start: 'top 92%', once: true },
  })

  // 视差落在独立的包裹层上，和 stage 的进场互不干扰
  gsap.fromTo(
    '.works__parallax',
    { y: 34 },
    {
      y: -34,
      ease: 'none',
      scrollTrigger: {
        trigger: '.section--works',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    }
  )
}

/* =========================================================
   4. 个人优势卡片：依次 stagger 出现
   卡片自带 transform 的 hover 过渡，所以动画期间临时屏蔽，
   结束后 clearProps 把控制权还给 CSS。
   ========================================================= */
function buildStrengths() {
  const cards = gsap.utils.toArray('.card')
  if (!cards.length) return

  const restore = withoutTransition(cards)

  gsap.from(cards, {
    y: 72,
    opacity: 0,
    duration: 1.25,
    ease: EASE,
    stagger: 0.12,
    clearProps: 'transform,opacity',
    scrollTrigger: { trigger: '.cards', start: 'top 80%', once: true },
    onComplete: restore,
  })
}

/* =========================================================
   5. 收尾页：整块依次落位
   ========================================================= */
function buildContact() {
  const items = gsap.utils.toArray(
    '.contact__meta, .contact__headline, .contact__sub, .contact__email, .contact__grid, .contact__strip, .contact__footer'
  )
  if (!items.length) return

  gsap.from(items, {
    y: 44,
    opacity: 0,
    duration: 1.2,
    ease: EASE,
    stagger: 0.11,
    scrollTrigger: { trigger: '.section--contact', start: 'top 72%', once: true },
  })
}

/**
 * 全站动效入口。
 *
 * · 用 useLayoutEffect，在浏览器绘制前就写好初始状态，避免闪一下再归位
 * · 用 gsap.context 包住，组件卸载时一次性 revert 掉所有动画和 ScrollTrigger
 * · 系统开启"减少动态效果"时完全不介入，页面直接呈现最终状态
 */
export function useSiteAnimations(scopeRef) {
  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const ctx = gsap.context(() => {
      buildOpening()
      buildSectionHeads()
      buildWorks()
      buildStrengths()
      buildContact()
    }, scope)

    // 字体 / 图片就位后重新量一次触发点，避免滚动位置算偏
    const refresh = () => ScrollTrigger.refresh()
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [scopeRef])
}
