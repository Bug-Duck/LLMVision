import { VisionZhipuAI } from '../dist/index.js'

const vision = new VisionZhipuAI()
await vision.init({
  key: 'b9d9de3069a7cf2b7d95a4f83a43b07d.M8oG4GQzqjxju1Jp',
  model: 'glm-4-flash',
  documentPath: '../src/document/main.md',
  embeddingsModel: 'embedding-3'
})

const ans = await vision.generate('在屏幕中央画一个长为100,宽为200的四边形', 1000, 1000)
console.log(ans)