/**
 * 全站统一的 Grainient（WebGL 柔和渐变 + 胶片颗粒）参数。
 *
 * 现在有两个地方在用它，都读这一份配置，改一处两边同步生效：
 *   1. App.jsx         —— 整页背景（固定在视口底层）
 *   2. WorkModal.jsx   —— 项目详情弹窗的内容卡底色
 *
 * 常用调节项：
 *   color1 / color2 / color3  三个色相
 *   timeSpeed                 流动速度（想更安静就调到 0.1 以下）
 *   contrast                  对比强弱
 *   grainAmount               胶片颗粒量
 */
export const grainientProps = {
  color1: '#e1d5c1',
  color2: '#e7f0f1',
  color3: '#ccc0d2',
  timeSpeed: 0.25,
  colorBalance: 0.0,
  warpStrength: 1.0,
  warpFrequency: 5.0,
  warpSpeed: 2.0,
  warpAmplitude: 50.0,
  blendAngle: 0.0,
  blendSoftness: 0.05,
  rotationAmount: 500.0,
  noiseScale: 2.0,
  grainAmount: 0.1,
  grainScale: 2.0,
  grainAnimated: false,
  contrast: 1.5,
  gamma: 1.0,
  saturation: 1.0,
  centerX: 0.0,
  centerY: 0.0,
  zoom: 0.9,
}
