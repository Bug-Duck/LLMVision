"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/models/base.ts
var _document = require('langchain/document');
var _fs = require('fs');
var _text_splitter = require('langchain/text_splitter');
var VisionBase = class {
  constructor() {
    this.params = {};
  }
  /**
   * Initialize the model.
   */
  async init(params) {
    var _a;
    this.params = params != null ? params : {};
    this.document = new (0, _document.Document)({
      pageContent: _fs.readFileSync.call(void 0, (_a = this.params.documentPath) != null ? _a : "../document/main.md", "utf-8"),
      metadata: {
        source: this.params.documentPath
      }
    });
    this.splitter = new (0, _text_splitter.RecursiveCharacterTextSplitter)({
      chunkOverlap: 200,
      chunkSize: 500
    });
    this.splittedDocument = await this.splitter.splitDocuments([this.document]);
  }
  /**
   * Generate a animation.
   * @param userInput The user input.
   * @param width The width of the animation.
   * @param height The height of the animation.
   */
  async generate(userInput, width, height) {
    return new Promise(() => {
    });
  }
};

// src/models/zhipu.ts
var _zhipuai = require('@langchain/community/embeddings/zhipuai');
var _zhipuai3 = require('@langchain/community/chat_models/zhipuai');
var _faiss = require('@langchain/community/vectorstores/faiss');
var _messages = require('@langchain/core/messages');

// src/prompts.ts
var main = `
You are an animation engineer using an animation engine named VueMotion. VueMotion is a programmatic animation engine based on Vue.js, allowing you to use Vue.js functions to create animations freely. Your task is to complete an animation project by generating Vue.js template code. Return only the code content of the Vue file without any descriptions. You must write it in a single Vue file.

# Usage

Here's an introduction to the basic usage of VueMotion:

\`\`\`vue
<script setup>
import { Text } from '@vue-motion/lib'
import { usePlayer, useWidget } from '@vue-motion/core'
import { onMounted } from 'vue'

// 1. Call the hook of \`usePlayer\` and get its two key functions.
const { play, useAnimation } = usePlayer()
// 4. Use the \`useWidget\` function hook to get the widget.
const widget = useWidget('id')
onMounted(() => {
  // 5. Call \`useAnimation\` and chain its functions. These actions are called in order.
  useAnimation(widget)
    .animate('rotate', { duration: 1, offset: 200 }) // Rotate 200 degrees in 1s.
    .delay(3) // Wait for 3s.
    .exec(() => {
      console.log('Time over!')
    })
  // 6. Play the animation
  play()
})
</script>

<template>
  <!-- 2. Set up the top component of VueMotion -->
  <Motion>
    <!-- 3. Add a widget called \`Text\` and set its wid (Widget ID) to "id" -->
    <Text wid="id">Hello world!</Text>
  </Motion>
</template>
\`\`\`

Important tips to remember:

1. Generate only the code, without any external descriptions.
2. The rotation unit is degrees, not radians.
3. Avoid complex mathematical computations; focus on describing the animation performance.

# APIs

The current packages of VueMotion are listed below:

| Name                       | Description                                                   |
| -------------------------- | ------------------------------------------------------------- |
| @vue-motion/core           | The core of VueMotion, including core hooks and APIs.         |
| @vue-motion/lib            | The basic shapes and components of VueMotion.                 |
| @vue-motion/extension-math | The mathematical components of VueMotion.                     |

Components and widgets have inheritance relationships, which will be noted in each widget's introduction.

Widgets are divided into real widgets and abstract widgets. Abstract widgets **cannot** be used directly. In the following sections, abstract widgets will be marked with \`*\`.

Required properties will be marked with \`!\`.

Now we have API documents as following.
`;

// src/models/zhipu.ts
var VisionZhipuAI = class extends VisionBase {
  async init(params) {
    await super.init(params);
    this.embeddings = new (0, _zhipuai.ZhipuAIEmbeddings)({
      apiKey: params.key,
      modelName: params.embeddingsModel
    });
    this.store = await _faiss.FaissStore.fromDocuments(this.splittedDocument, this.embeddings);
    this.model = new (0, _zhipuai3.ChatZhipuAI)({
      apiKey: params.key,
      modelName: params.model
    });
  }
  async generate(userInput, width, height) {
    var _a, _b;
    const retriever = (_a = this.store) == null ? void 0 : _a.asRetriever();
    const context = await (retriever == null ? void 0 : retriever.invoke(userInput));
    const knowledges = context == null ? void 0 : context.map((doc) => doc.pageContent).join("\n");
    const prompts = new (0, _messages.SystemMessage)(main);
    const response = await ((_b = this.model) == null ? void 0 : _b.invoke([prompts, new (0, _messages.SystemMessage)(knowledges), new (0, _messages.HumanMessage)(userInput)]));
    return response.content;
  }
};



exports.VisionBase = VisionBase; exports.VisionZhipuAI = VisionZhipuAI;
