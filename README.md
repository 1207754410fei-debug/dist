# 严毅飞 YAN YIFEI — 品牌设计师作品集

浅灰白、克制、极简工作室质感的个人作品集站点。React 18 + Vite 6，PC 优先，版心 1700px。

整体色调参考 MDX 工作室官网：大面积留白、浅灰白柔和渐变底、暖橙作唯一强调色。

> 作品轮播使用 React Bits 的 `FlexCarousel` 组件（WebGL 液态镜头效果），
> 全站背景使用 React Bits 的 `Grainient` 组件（WebGL 柔和渐变 + 胶片颗粒）。
> 两者唯一的依赖都是 `ogl`，已写入 `package.json`，`npm install` 会自动装上。
>
> 滚动与首屏动效使用 GSAP + ScrollTrigger（`gsap`，已写入 `package.json`）。

---

## 一、怎么打开

**最省事的方式：双击 `start.cmd`。**

会自动启动本地服务并打开浏览器（地址 http://127.0.0.1:5173 ）。
关闭那个黑色窗口就等于停止服务。

项目里已经自带了一份免安装的 Node.js（`tools/runtime/`），所以不用额外装任何东西。
如果你的电脑上已经装了 Node.js，也可以直接在命令行里跑：

```
npm install
npm run dev
```

### 打包成静态文件

双击 `build.cmd`，或者命令行执行 `npm run build`。
产物在 `dist/` 目录，`base` 已设为相对路径，双击 `dist/index.html` 就能直接看，
也可以把整个 `dist` 文件夹上传到任意静态托管（Vercel / Netlify / 阿里云 OSS / 腾讯云 COS 等）。

---

## 二、页面结构

| 板块 | 锚点 | 内容 |
| --- | --- | --- |
| 首页 Hero | `#top` | 全屏、直接透出全站 Grainient 渐变底；左侧大标题＋说明＋按钮、中间柔和球体、右侧说明＋标签胶囊 |
| 精选项目 | `#work` | FlexCarousel 作品轮播（可拖动，7 件作品），点击任意卡片打开详情弹窗 |
| 项目详情弹窗 | — | 点击任意作品卡 / 轮播卡片打开：全屏深色模态，左图右文，背景页面整体高斯模糊 |
| 个人优势 | `#strengths` | 6 张能力卡片 |
| 联系方式 | `#contact` | 整屏收尾页、大号邮箱、联系信息、页脚 |

---

## 三、日常修改只看两个地方

### 1. 文字内容 → `src/data/content.js`

姓名、简介、联系方式、项目、优势、页脚，全部集中在这一个文件里，
改完保存，页面会立即刷新。

### 2. 图片和视频 → `public/media/`

```
public/media/
├── hero.mp4          # 首页背景视频（已内置一段 10 秒抽象循环，可直接替换）
├── hero-poster.jpg   # 视频加载前的封面图
├── portrait.jpg      # 个人照片（3:4 竖版，建议 1200x1600 以上）
└── works/            # 项目图片，放进来后在 content.js 里填 image 字段
```

详细规格见 `public/media/README.md`。
所有媒体路径都写成 `media/xxx.jpg` 这种相对形式（**不要以 / 开头**），
这样开发预览和打包后的静态文件都能正常加载。

---

## 四、目录结构

```
portfolio/
├── index.html               入口 HTML（标题、描述、主题色）
├── vite.config.js           Vite 配置
├── start.cmd                一键启动本地预览
├── build.cmd                一键打包静态文件
├── public/
│   └── media/               视频与图片资源
├── src/
│   ├── main.jsx             应用入口，挂载 React + 引入样式
│   ├── App.jsx              页面骨架，按顺序组合 5 个板块
│   ├── data/content.js      全部文案与项目数据
│   ├── data/grainient.js    全站 Grainient 渐变参数（页面背景 + 弹窗卡片共用）
│   ├── animations/siteAnimations.js  全站动效编排（首屏 opening + 滚动进场）
│   ├── hooks/useScroll.js   滚动入场、导航高亮、数字递增
│   ├── components/
│   │   ├── Nav.jsx          固定导航栏
│   │   ├── Hero.jsx         首页板块
│   │   ├── HeroStage.jsx    首页动态背景（视频 + Canvas 兜底）
│   │   ├── Marquee.jsx      技能跑马灯
│   │   ├── Works.jsx        精选项目
│   │   ├── WorkModal.jsx    项目详情弹窗（全屏模态 + 错开入场动画）
│   │   ├── FlexCarousel.jsx 作品轮播（React Bits 组件，WebGL）
│   │   ├── FlexCarousel.css 轮播样式
│   │   ├── Grainient.jsx    全站背景渐变（React Bits 组件，WebGL）
│   │   ├── Grainient.css    背景容器样式
│   │   ├── CoverArt.jsx     项目卡片的抽象封面
│   │   ├── Strengths.jsx    个人优势
│   │   ├── Contact.jsx      联系方式收尾页
│   │   ├── SectionHead.jsx  板块标题组件
│   │   └── icons.jsx        线性图标
│   └── styles/
│       ├── global.css       设计变量、重置、导航、通用组件
│       ├── sections.css     各板块样式
│       └── modal.css        项目详情弹窗 + 页面模糊
└── tools/runtime/           免安装 Node.js（不想用可以直接删掉）
```

---

## 五、想调风格的话

改 `src/styles/global.css` 最上面的 `:root` 变量就够了：

```css
--bg: #f3f3f1;        /* 浅灰白底 */
--fg: #121212;        /* 主文字 */
--fg-2: #5c5c58;      /* 次级文字 */
--fg-3: #9a9a95;      /* 弱化文字 */
--accent: #e4551f;    /* 暖橙强调色 */
--content: 1700px;    /* 版心宽度 */
--pad: clamp(24px, 3vw, 56px);  /* 左右留白 */
```

首屏中间那个柔和球体（`.hero__orb`）是纯 CSS 渐变 + mask 颗粒实现的，没有用图片。
不想要的话，把 `Hero.jsx` 里的 `.hero__orbCol` 整块删掉，网格会自动变成两栏。

全站背景是 `App.jsx` 里的 `<Grainient />`，参数集中在 `src/data/grainient.js`：
`color1/2/3` 是三个色相，`timeSpeed` 控制流动速度，`contrast` 控制对比强弱，
`grainAmount` 是胶片颗粒量。想要更安静就把 `timeSpeed` 调到 0.1 以下。
系统开启"减少动态效果"时该组件不会被渲染，页面退回 `--bg` 纯色底。

项目详情弹窗的内容卡（`.modal__panelBg`）用的是**同一份**参数，
所以弹窗的底色和整页背景是同一套渐变语言，改 `grainient.js` 会同时生效。

---

## 六、动效在哪里调

全部集中在 `src/animations/siteAnimations.js`，用 `useSiteAnimations()` 挂在 `App.jsx` 上，
作用域限制在 `.page` 这一层。分五段：

| 函数 | 负责 |
| --- | --- |
| `buildOpening()` | 首屏 opening：导航落位 → 小标签 → 标题两行遮罩揭开 → 正文/按钮/右栏/胶囊依次跟上 |
| `buildSectionHeads()` | 每个模块标题：英文标签先落位 → 大标题逐字从遮罩下方推上来 → 右侧说明跟上 |
| `buildWorks()` | 作品轮播进场 + 随滚动的轻微视差（scrub） |
| `buildStrengths()` | 能力卡片依次 stagger 出现 |
| `buildContact()` | 收尾页整块依次落位 |

几个约定：

- 缓动统一用 `expo.out` / `power3.out`——起步快、收尾长，有重量感但不回弹。
- 只动 `transform` 和 `opacity`，不触发重排，也不会和 WebGL 层抢资源。
- 元素自身若带 CSS `transition: transform`（比如能力卡片的 hover 上浮），
  动画期间会被 `withoutTransition()` 临时关掉，结束后 `clearProps` 把控制权还给 CSS，
  hover 效果照常。节奏想更慢就调各处的 `duration` / `stagger`。
- 系统开启「减少动态效果」时整套动效完全不介入，页面直接呈现最终状态。

---

## 七、性能约定

这些是踩过坑之后固定下来的做法，改动时尽量别破坏：

**首屏只加载 HTML / CSS / JS 三个请求，没有任何图片。**
作品轮播一挂载就会拉全部作品图并建立 WebGL 上下文，所以用 `useInView`
把它推迟到接近视口（提前 320px）再渲染，并且带一个"用户一开始滚动就立刻加载"的兜底。

**作品图统一用 WebP。** 同样是肉眼无差的画质，比 JPEG 小 30–65%。
现有这组是 642KB → 235KB。

**滚动监听只做两件事，且都不在每帧触发 React 重渲染。**
`useScrollDirection` 只在阈值/方向真正翻转时更新 state；
`useActiveSection` 把各板块的 `offsetTop` 缓存下来，只在挂载和 resize 时重量，
避免滚动时每帧读取布局属性造成强制重排。`App.jsx` 里的 `sectionIds` 必须 `useMemo`，
否则每次渲染都会重建 effect。

**GSAP 只动 `transform` 和 `opacity`**，不触发重排；所有 ScrollTrigger 都是 `once: true`，
触发后自毁。元素自带 CSS `transition: transform` 时，动画期间要临时屏蔽（见 `withoutTransition`）。

**`Grainient` 的渲染分辨率上限被改成了 1.5**（原版是 2）。
这是相对上游组件唯一的本地改动，文件顶部有注释标注。
这层是低频渐变，降分辨率肉眼无差别，Retina 屏上能省约 44% 的片元着色量。

**遮罩层（`.grain`）的 `inset` 是 -12% 而不是原版的 -50%。**
它的位移动画幅度最多 2%，-50% 等于白铺 4 倍视口面积的一层噪声。

---

## 八、上传 GitHub 与部署

### 先搞清楚：哪些东西不该传

`.gitignore` 已经排除了两样大东西，**不要绕过它**：

| 文件夹 | 体积 | 说明 |
| --- | --- | --- |
| `node_modules/` | 约 43 MB | 依赖，别人 `npm install` 就能装回来 |
| `tools/runtime/` | 约 78 MB | 我塞进来的免安装 Node，只在你本机跑预览用 |
| `dist/` | — | 构建产物，平台会自动生成 |

实际要传的只有 **41 个文件、约 434 KB**（含 235KB 作品图）。

### 第一步：传到 GitHub

你机器上没装 git，所以有两条路：

**最省事：装 GitHub Desktop**（<https://desktop.github.com>），它自带 git，不用配命令行。

1. 装好后登录你的 GitHub 账号
2. 菜单 `File → Add local repository`，选到 `outputs\portfolio` 这个文件夹
3. 它会提示这不是仓库，点 `create a repository` 直接创建
4. 左下角填一句提交说明（比如 `first version`），点 `Commit to main`
5. 点右上角 `Publish repository`

**或者：装 Git for Windows**（<https://git-scm.com>），然后在项目文件夹里右键
`Open Git Bash here`，依次执行：

```bash
git init
git add .
git commit -m "first version"
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

推之前建议先 `git status` 看一眼，确认列表里**没有** `node_modules/` 和 `tools/runtime/`。

### 第二步：部署（三种，选一个）

**方案 A：Vercel / Netlify / Cloudflare Pages（推荐，零配置）**

注册后选 `Import Git Repository`，授权并选中刚推上去的仓库，平台会自己识别这是 Vite 项目。
如果让你填，就填：

- Build command：`npm run build`
- Output directory：`dist`

之后每次 `git push`，它都会自动重新构建发布。用这个方案的话，
仓库里的 `.github/workflows/deploy-pages.yml` 可以删掉。

**方案 B：GitHub Pages（仓库里已经配好了）**

我已经放了 `.github/workflows/deploy-pages.yml`，推上去之后：

1. 进仓库 `Settings → Pages`
2. `Source` 选 **GitHub Actions**
3. 回到 `Actions` 标签，等 `Deploy to GitHub Pages` 跑完

访问地址是 `https://你的用户名.github.io/仓库名/`。
`vite.config.js` 里的 `base: './'` 让所有资源都用相对路径，
所以放在子路径下也能正常加载，不用额外改配置。

**方案 C：手动上传到自己的服务器**

双击 `build.cmd`，等它跑完，`dist/` 文件夹里就是完整成品。
把这个文件夹里的**全部内容**上传到服务器的网站根目录即可。
构建产物是纯静态文件，任何支持静态站点的空间都行（阿里云 OSS、腾讯云 COS、
宝塔面板、虚拟主机……）。

### 关于「导出」

项目里已经有一份现成的 `dist/`，共 618 KB，是用和开发预览完全相同的打包链路产出的，
可以直接拿去部署（方案 C）。但**它不是 Vite 官方构建**——我这边的环境禁止创建子进程，
`vite build` 跑不起来。

你自己双击一次 `build.cmd`（约 10 秒），产出的才是标准的 Vite 构建，会覆盖掉这份。
方案 A 和 B 都不需要你本地构建，平台会自己做。

### 更新网站

改完内容后：

1. 在项目文件夹里双击 `start.cmd` 预览，确认没问题
2. 用 GitHub Desktop 提交并推送（写一句说明，比如「更新项目文案」）
3. 方案 A / B 会自动重新发布；方案 C 需要重新跑 `build.cmd` 再上传一次
