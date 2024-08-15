import { App } from "newcar"
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"

export async function exportToVideo(app: App, duration: number, fps: number) {
  const urls = []
  for (let f = 0; f < duration; f += 1 / fps) {
    app.scene.elapsed = f
    App.update(app, app.surface.getCanvas())
    const blob = new Blob([app.surface.makeImageSnapshot().encodeToBytes() as ArrayBuffer], { type: 'image/png' })
    const url = URL.createObjectURL(blob)
    urls.push(url)
  }

  const ffmpeg = createFFmpeg({ log: true })
  await ffmpeg.load()
  for (let i = 0; i < urls.length; i++) {
    ffmpeg.FS('writeFile', `image${i}.png`, await fetchFile(urls[i]))
  }

  await ffmpeg.run(
    '-framerate', fps.toString(),
    '-i', 'image%d.png',  // 图片名称模板
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    'output.mp4'
  )

  const data = ffmpeg.FS('readFile', 'output.mp4')
  const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))

  return url
}