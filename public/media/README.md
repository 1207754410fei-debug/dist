# 媒体文件放置说明

## 1. 项目图片

把作品图放进 `public/media/works/`，例如 `public/media/works/project-01.webp`，
然后在 `src/data/content.js` 里对应项目的 `image` 字段填入路径（**不要以 / 开头**）：

```js
image: 'media/works/project-01.webp',
```

建议统一用 **WebP**（同样画质比 JPEG 小 30–65%）。现有一组已经是从 JPEG 转过来的：
642KB → 235KB，画质肉眼无差别。

## 2. 关于 `hero.mp4` / `hero-poster.jpg`

这两个文件是早期版本的首屏视频背景，**现在已经没有任何代码引用**。
首屏改成直接透出全站的 Grainient 渐变底色，不再需要视频层。

可以直接手动删除这两个文件（大约 2.8MB），不影响任何功能。
如果以后想重新加回视频背景，它们还在这里，可以直接复用。
