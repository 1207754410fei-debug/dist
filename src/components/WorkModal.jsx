import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { IconClose } from './icons.jsx'
import Grainient from './Grainient.jsx'
import { grainientProps } from '../data/grainient.js'

// 与 CSS 里的淡出时长保持一致：先播完反向动画，再通知父级卸载
const EXIT_MS = 460

/**
 * 弹窗的纯展示层。
 * 单独拆出来是为了不依赖 portal，方便在服务端渲染里做结构校验；
 * 默认导出的 WorkModal 负责挂载、动画状态与交互。
 */
export function WorkModalContent({ item, phase = 'open', onClose, closeButtonRef }) {
  const hasImage = Boolean(item.image)

  // 点击遮罩区域关闭；内容区（图片 / 文字 / 关闭按钮）不触发关闭
  const handleClick = (event) => {
    if (event.target.closest?.('[data-modal-content]')) return
    onClose?.()
  }

  return (
    <div
      className="modal"
      data-phase={phase}
      data-has-image={hasImage ? '' : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby="work-modal-title"
      onClick={handleClick}
    >
      {/* 遮罩：全屏深色底 */}
      <div className="modal__backdrop" aria-hidden="true" />

      <div className="modal__panel">
        {/* 卡片底色：和整页背景同一套 Grainient 渐变，
            被圆角裁切，留下一点点透明度让底下被模糊的页面隐隐透上来 */}
        <div className="modal__panelBg" aria-hidden="true">
          <Grainient {...grainientProps} />
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          className="modal__close"
          data-modal-content
          onClick={onClose}
          aria-label="关闭项目详情"
        >
          <IconClose />
        </button>

        {/* 左栏：作品原图，contain 保证比例完整不变形 */}
        {hasImage ? (
          <figure className="modal__media" data-modal-content>
            <img src={item.image} alt={`${item.title} — ${item.subtitle}`} />
          </figure>
        ) : null}

        {/* 右栏：文字区，按内联 --d 依次错开入场 */}
        <div className="modal__body" data-modal-content>
          <h2 id="work-modal-title" className="modal__title modal__reveal" style={{ '--d': '80ms' }}>
            {item.title}
          </h2>

          <p className="modal__eyebrow mono modal__reveal" style={{ '--d': '180ms' }}>
            <span className="modal__eyebrowNo">{item.no}</span>
            {item.subtitle}
          </p>

          <div className="modal__meta modal__reveal" style={{ '--d': '250ms' }}>
            <span className="mono">{item.year}</span>
            <i aria-hidden="true" />
            <span className="mono">{item.role}</span>
          </div>

          <p className="modal__desc modal__reveal" style={{ '--d': '330ms' }}>
            {item.desc}
          </p>

          <ul className="modal__tags modal__reveal" style={{ '--d': '410ms' }}>
            {item.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/**
 * 全屏项目详情弹窗。
 *
 * 交互：
 * - 打开：挂载后下一帧切到 open，遮罩淡入 → 左侧图片淡入 + 轻微放大 → 右侧文字错开入场
 * - 关闭：点击遮罩 / 关闭按钮 / ESC → 反向淡出，动画结束再卸载
 * - 打开期间锁定页面滚动；关闭后焦点回到触发元素
 * - 通过 portal 渲染在 .page 之外，所以页面整体模糊不会影响弹窗本身
 */
export default function WorkModal({ item, onClose }) {
  // phase: 'enter' 挂载初期 → 'open' 触发过渡 → 'exit' 反向过渡
  const [phase, setPhase] = useState('enter')
  const closeButtonRef = useRef(null)
  const lastFocusedRef = useRef(null)
  const closingRef = useRef(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setPhase('open'))
    return () => cancelAnimationFrame(id)
  }, [])

  // 加锁避免 ESC 与点击重复触发
  const close = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    setPhase('exit')
    window.setTimeout(onClose, EXIT_MS)
  }, [onClose])

  // 锁滚动 + ESC 关闭 + 焦点管理
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKeyDown)

    lastFocusedRef.current = document.activeElement
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      if (lastFocusedRef.current instanceof HTMLElement) lastFocusedRef.current.focus()
    }
  }, [close])

  return createPortal(
    <WorkModalContent
      item={item}
      phase={phase}
      onClose={close}
      closeButtonRef={closeButtonRef}
    />,
    document.body
  )
}
