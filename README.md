# LLMVision

Online: [llmvision.bugduck.org](https://llmvision.bugduck.org)

LLMVision is a mathematical and data visualization animation maker with LLM, it is based on [Newcar Animation Engine](https://github.com/dromara/newcar)

LLMVision是一个数学动画和数据可视化动画生成器AI,基于[Newcar动画引擎](https://github.com/dromara/newcar)

## The Models Supported

- [x] GPT-4
- [x] GLM-3
- [x] GLM-4
- to be continue...

## Usage

1. Choose a model
2. Input the API Key
3. Input the description of animation you want to generate
4. Click "Generate" button, and keep waiting until generating finish

---

1. 选择模型
2. 填入对应的模型的API Key
3. 输入你想要生成的动画
4. 点击"Generate"，等待生成完毕

## Packages

| Package         | Description                                          |
| --------------- | ---------------------------------------------------- |
| @llmvision/core | The prompts and generating function are all in there |
| @llmvision/app  | The pure front-end app                               |

## Develop & Build

```shell
# dev core
$ cd packages/core
$ pnpm dev
```
```shell
# dev app
$ cd packages/app
$ pnpm dev
```
```shell
# build app
$ cd packages/app
$ pnpm build
```

Thanks for every support that makes BugDuck walk to there!
