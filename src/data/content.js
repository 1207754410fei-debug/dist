// 站点全部文案与内容集中在这里，改这一个文件就能更新整站。
// 媒体路径统一写相对 public/ 的形式，例如 'media/works/xxx.jpg'（不要以 / 开头），
// 这样开发预览、Vite 打包、直接双击 dist/index.html 三种方式都能正常加载。
// 视频 / 图片的规格说明见 public/media/README.md。
//
// 注：原来的「个人经历」板块（个人介绍 / 联系方式 / 项目数据 / 经历时间线）已按要求移除，
// 现在首屏之后直接进入精选项目。需要恢复时告诉我即可。

export const profile = {
  nameZh: '严毅飞',
  nameEn: 'YAN YIFEI',
  role: '品牌设计师',
  roleEn: 'Brand Designer',
  tagline: '把品牌讲清楚，然后让它看起来值得被记住。',
  location: '中国 · 福建三明 / 法国 · 马赛',
  email: '1207754410@qq.com',
  phone: '15259880646',
  wechat: '15259880646',
  born: '2002.04',
}

export const hero = {
  // 首屏：顶部一行小标签 + 左下两行大标题 + 右下说明与标签胶囊
  kicker: '严毅飞 YAN YIFEI',
  kickerMeta: 'BRAND DESIGNER · PORTFOLIO 2026',
  headline: ['把品牌讲清楚，', '让人记住它。'],
  lede: '品牌视觉 / 视觉系统 / 展览策划。从概念定位到现场落地，用克制的秩序感，为品牌建立可被识别的视觉语言。',
  aside:
    '中央美术学院艺术管理本科，凯致商学院创意与设计管理硕士。我更在意视觉在真实场景里是否生效——所以从策略、概念到物料落地，我会完整跟到底。',
  tags: ['品牌视觉', '视觉系统', '展览策划', '艺术指导', 'AI 视觉', '跨文化沟通'],
  primaryCta: { label: '查看精选项目', href: '#work' },
  secondaryCta: { label: '联系我', href: '#contact' },
}

export const marqueeItems = [
  'BRAND IDENTITY',
  'VISUAL SYSTEM',
  'EXHIBITION DESIGN',
  'ART DIRECTION',
  'POSTER DESIGN',
  'AI VISUAL',
  'SPATIAL GRAPHICS',
  'CROSS-CULTURE',
]

export const works = {
  index: '01',
  title: '精选项目',
  titleEn: 'SELECTED WORK',
  intro: '七个项目，从硕士阶段的品牌共创，到本科的实地调研与写生。',
  items: [
    {
      id: 'amira',
      no: '01',
      title: 'Amira',
      subtitle: 'Brand Identity & Visual Direction',
      year: '2026',
      role: '视觉设计',
      tags: ['品牌视觉', '场景影像', '视觉方向'],
      desc: '以织物、木料与自然光为线索的生活方式品牌视觉探索，用松弛的场景影像建立品牌的质感基调。',
      image: 'media/works/amira.webp',
    },
    {
      id: 'flumily',
      no: '02',
      title: 'Flumily',
      subtitle: 'MSc Creativity & Design Management',
      year: '2026',
      role: '团队成员 · 视觉设计',
      tags: ['品牌命名', '视觉系统', '五人协作'],
      desc: '凯致商学院创意与设计管理硕士小组项目，与四位同学共同完成命名、视觉调性与完整提案。',
      image: 'media/works/flumily.webp',
    },
    {
      id: 'ricard',
      no: '03',
      title: 'Ricard Sunshine Hub',
      subtitle: 'Ricard · Up & Around',
      year: '2026',
      role: '团队成员 · 视觉设计',
      tags: ['品牌延展', '活动视觉', '字体排版'],
      desc: '围绕 Ricard 的「阳光」品牌资产展开的场景延展提案，用高饱和单色与大写粗体建立醒目的活动视觉。',
      image: 'media/works/ricard.webp',
    },
    {
      id: 'slow-fashion-week',
      no: '04',
      title: 'slow fashion week',
      subtitle: 'Charte Graphique',
      year: '2026',
      role: '视觉设计',
      tags: ['字标设计', '图形规范', '排版系统'],
      desc: '为 slow fashion week 建立完整图形规范（Charte Graphique），自定义字标与极简黑白排版系统。',
      image: 'media/works/slow-fashion-week.webp',
    },
    {
      id: 'west-bund-report',
      no: '05',
      title: '上海市西岸沿江文化带调研报告',
      subtitle: 'Post-industrial Regeneration Research',
      year: '2022.10 — 2022.11',
      role: '课题组成员',
      tags: ['实地调研', '影像记录', '报告视觉'],
      desc: '研究滨江后工业空间的更新路径，负责实地调研、影像拍摄与后期处理，主导报告的整体视觉与版式设计。',
      image: 'media/works/west-bund-report.webp',
    },
    {
      id: 'habitat-waste',
      no: '06',
      title: '「未来栖息地」社区共建',
      subtitle: 'Venice Biennale Workshop',
      year: '2025.11 — 2025.12',
      role: '团队成员',
      tags: ['可持续设计', '材料再生', '社区共建'],
      desc: '以垃圾回收驱动社区共建为主题，把建筑废料转化为家具与公共空间构件，搭建政府—企业—居民三方协同的社区方案。',
      image: 'media/works/habitat-waste.webp',
    },
    {
      id: 'wuyuan-sketch',
      no: '07',
      title: '婺源乡村写生',
      subtitle: 'Field Sketch · Wuyuan',
      year: '2022.03 — 2022.04',
      role: '创作者',
      tags: ['写生', '色彩研究', '皖南'],
      desc: '皖南乡村风景写生，研究水面、岩石与建筑光影的色彩关系，完成 20 余幅写生创作。',
      image: 'media/works/sketch-water.webp',
    },
  ],
}

export const strengths = {
  index: '02',
  title: '个人优势',
  titleEn: 'CAPABILITIES',
  intro: '不只交付一张图，而是提供从判断到落地的一整套能力。',
  items: [
    {
      icon: 'grid',
      title: '品牌视觉系统',
      en: 'Brand Identity',
      desc: '从 LOGO、校标到完整的视觉延展规范，保证品牌在不同物料上保持一致且可复用的识别度。',
      tags: ['LOGO', 'VI 延展', '视觉规范'],
    },
    {
      icon: 'layers',
      title: '展览与活动策划',
      en: 'Exhibition & Event',
      desc: '展区规划、视觉方案、物料统筹到现场布展，能把方案推动到实物落地，而不止停留在提案阶段。',
      tags: ['展区规划', '现场落地', '策划案'],
    },
    {
      icon: 'compass',
      title: '概念与叙事',
      en: 'Concept & Narrative',
      desc: '擅长为主题做定位与视觉方向判断，把抽象概念转化为可被感知的视觉语言与体验线索。',
      tags: ['主题定位', '视觉方向', '叙事'],
    },
    {
      icon: 'spark',
      title: 'AI 辅助创作',
      en: 'AI Visual Workflow',
      desc: '使用 Midjourney 快速生成概念视觉素材，把前期方案推演的时间压缩到以小时计。',
      tags: ['Midjourney', '概念生成', '效率'],
    },
    {
      icon: 'cube',
      title: '空间与建模表达',
      en: 'Space & Modeling',
      desc: '用 SketchUp 完成虚拟渲染与实体模型制作，让空间方案在汇报阶段就具备可判断的立体感。',
      tags: ['SketchUp', '虚拟渲染', '实体模型'],
    },
    {
      icon: 'globe',
      title: '跨文化沟通',
      en: 'Cross-culture',
      desc: '在中、英、法多语言环境中学习与工作，参与外事接待与大型活动执行，适应不同文化语境的表达。',
      tags: ['中英法', '外事接待', '活动执行'],
    },
  ],
}

export const contact = {
  index: '03',
  title: '联系方式',
  titleEn: 'GET IN TOUCH',
  headline: '一起把品牌做得更清楚。',
  sub: '接受品牌视觉、展览策划与视觉系统相关的项目合作与实习机会。',
  items: [
    { k: 'Email', v: '1207754410@qq.com', href: 'mailto:1207754410@qq.com' },
    { k: 'Phone / WeChat', v: '15259880646', href: 'tel:15259880646' },
    { k: 'Based in', v: '中国 · 福建三明 / 法国 · 马赛', href: null },
  ],
  footerNote: '© 2026 严毅飞 YAN YIFEI — 品牌设计师作品集',
}

export const navLinks = [
  { index: '01', label: '精选项目', href: '#work' },
  { index: '02', label: '个人优势', href: '#strengths' },
  { index: '03', label: '联系方式', href: '#contact' },
]
