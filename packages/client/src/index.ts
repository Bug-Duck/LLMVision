import express from 'express'
import cors from 'cors'
import { createVisionAppBasedOnAnthropic, createVisionAppBasedOnOpenAI, createVisionAppBasedOnZhipuAI, generateByAnthropic, generateByOpenAI, generateByZhipuAI } from '@llmvision/core'

const app = express()
app.use(express.json())
app.use(cors())
const port = 3000

app.get('/', (req, res) => {
  res.send('Success!')
})

app.post('/generate/:model/', async (req, res) => {
  try {
    let llm: any
  let json: any
  console.log(req.body)
  const body = req.body
  switch (req.params.model) {
    case 'gpt-4':
      llm = createVisionAppBasedOnOpenAI({
        openAIApiKey: body.key,
        model: 'gpt-4'
      })
      json = await generateByOpenAI(llm, body.prompt, body.options)
      break
    case 'glm-3':
      llm = createVisionAppBasedOnZhipuAI({
        modelName: 'glm-3-turbo',
        model: 'glm-3-turbo',
        zhipuAIApiKey: body.key,
      })
      json = await generateByZhipuAI(llm, body.prompt, body.options)
      break
    case 'glm-4':
      llm = createVisionAppBasedOnZhipuAI({
        modelName: 'glm-4',
        model: 'glm-4',
        zhipuAIApiKey: body.key,
      })
      json = await generateByZhipuAI(llm, body.prompt, body.options)
      break
    case 'claude-3':
      llm = createVisionAppBasedOnAnthropic({
        anthropicApiKey: body.key,
        model: 'claude-3-sonnet-20240229',
      })
      json = await generateByAnthropic(llm, body.prompt, body.options)
      break
  }
  res.send(json)
  } catch (err) {
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})