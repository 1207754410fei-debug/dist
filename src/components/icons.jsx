// 统一的线性图标集合（1.25px 描边，24x24 画布）
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  width: 24,
  height: 24,
}

export function IconGrid(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1" />
    </svg>
  )
}

export function IconLayers(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" />
      <path d="m3 12.5 9 4.5 9-4.5" />
      <path d="m3 17 9 4.5 9-4.5" />
    </svg>
  )
}

export function IconCompass(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1Z" />
    </svg>
  )
}

export function IconSpark(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M6.2 6.2l2.2 2.2M15.6 15.6l2.2 2.2M17.8 6.2l-2.2 2.2M8.4 15.6l-2.2 2.2" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  )
}

export function IconCube(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.8 20 7v10l-8 4.2L4 17V7l8-4.2Z" />
      <path d="M4 7l8 4.2L20 7M12 11.2V21.2" />
    </svg>
  )
}

export function IconGlobe(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 2.6 4 5.6 4 9s-1.4 6.4-4 9c-2.6-2.6-4-5.6-4-9s1.4-6.4 4-9Z" />
    </svg>
  )
}

export function IconArrow(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function IconArrowUp(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  )
}

export function IconArrowUpRight(props) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <path d="M7 17 17 7M8.6 7H17v8.4" />
    </svg>
  )
}

export function IconClose(props) {
  return (
    <svg {...base} width={18} height={18} {...props}>
      <path d="M6 6 18 18M18 6 6 18" />
    </svg>
  )
}

export function IconMail(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2.8" y="5" width="18.4" height="14" rx="2" />
      <path d="m3.5 6.8 8.5 6 8.5-6" />
    </svg>
  )
}

export function IconPhone(props) {
  return (
    <svg {...base} {...props}>
      <path d="M8.4 3.5H5.6A2.1 2.1 0 0 0 3.5 5.7c0 8.2 6.6 14.8 14.8 14.8a2.1 2.1 0 0 0 2.2-2.1v-2.8l-4.3-1.6-1.9 2.3a12.4 12.4 0 0 1-5.6-5.6l2.3-1.9L8.4 3.5Z" />
    </svg>
  )
}

export function IconPin(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21.5s7-6.1 7-11.1a7 7 0 1 0-14 0c0 5 7 11.1 7 11.1Z" />
      <circle cx="12" cy="10.2" r="2.6" />
    </svg>
  )
}

export const iconMap = {
  grid: IconGrid,
  layers: IconLayers,
  compass: IconCompass,
  spark: IconSpark,
  cube: IconCube,
  globe: IconGlobe,
}
