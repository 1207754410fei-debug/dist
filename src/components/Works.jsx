import { useMemo, useRef } from 'react'
import { works } from '../data/content.js'
import SectionHead from './SectionHead.jsx'
import FlexCarousel from './FlexCarousel.jsx'
import { useInView } from '../hooks/useScroll.js'

/**
 * 精选项目。
 *
 * 结构很克制：一块板块标题 + 一条可以左右拖动的作品轮播。
 * 项目的描述、标签、年份与角色都收在全屏详情弹窗里，
 * 页面上只留作品本身，滚动节奏也更干净。
 */
export default function Works({ onOpenWork }) {
  const stageRef = useRef(null)

  // 性能：FlexCarousel 一挂载就会把全部作品图拉下来、建立 WebGL 上下文并开启渲染循环。
  // 作品区本来就在首屏之外，所以推迟到它接近视口（提前 700px）时再渲染——
  // 首屏因此少掉两百多 KB 的图片请求和一个 WebGL 上下文。
  // 预载边距取 320px：再大就会在首屏加载时直接触发，失去延迟的意义；
  // 再小则用户快速下滚时可能看到空位。作品图总共才 235KB，这点提前量足够。
  // 第三个参数是兜底：用户一开始滚动就立即加载，避免任何"空白作品区"的可能。
  const ready = useInView(stageRef, '320px', true)

  // 传给 FlexCarousel 的数据：封面图 + 中英文标题
  const carouselItems = useMemo(
    () =>
      works.items.map((item) => ({
        src: item.image,
        alt: `${item.title} — ${item.subtitle}`,
        title: item.title,
        subtitle: item.subtitle,
      })),
    []
  )

  return (
    <section className="section section--works" id="work">
      <div className="shell">
        <SectionHead
          index={works.index}
          title={works.title}
          titleEn={works.titleEn}
          intro={works.intro}
        />
      </div>

      <div className="shell">
        <div className="works__stage" ref={stageRef}>
          {/* 视差动效落在这层，和 stage 自身的进场动画分开，互不干扰 */}
          <div className="works__parallax">
            {/* 关掉组件自带的 focusOnClick：点击行为统一交给详情弹窗，
                否则轮播内部的聚焦动画会和弹窗叠在一起。 */}
            {ready ? (
              <FlexCarousel
                items={carouselItems}
                preset="liquid"
                intro="rise"
                fit="natural"
                cardHeight={0.54}
                gap={14}
                radius={14}
                squeeze={0.22}
                focusOnClick={false}
                captions
                captureWheel={false}
                onSelect={(index) => onOpenWork(works.items[index])}
              />
            ) : null}
          </div>
        </div>

        <p className="works__hint mono">
          <span>拖动浏览</span>
          <i aria-hidden="true" />
          <span>点击卡片打开项目详情</span>
        </p>
      </div>
    </section>
  )
}
