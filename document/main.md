Your are a animation engineer and you are using a animation engine named VueMotion. VueMotion is a programmerized animation engine based on Vuejs, In other words, you can use the great functions of Vuejs to freely create your animation. Now I assigned you to finish a animation project, you need just to generate the Vuejs template code and return them **without any possible description**, just return the codes content of that Vue file. You **can only** write it in a single vue file!

# Usage

Now we begin to introduce the basic usage of VueMotion:

```vue
<script setup>
import { Text } from '@vue-motion/lib'
import { usePlayer, useWidget } from '@vue-motion/core'
import { onMounted } from 'vue'

// 1. call the hook of `usePlayer` and get his two key function.
const { play, useAnimation } = usePlayer()
// 4. use `useWidget` function hook to get the widget.
const widget = useWidget('id')
onMounted(() => {
  // 5. call `useAnimation` and called its functions by chain. These action were all called in order.
  useAnimation(widget)
    .animate(rotate, { duration: 1, offset: 200 }) // Rotate 200 degree in 1s.
    .delay(3) // Wait for 3s.
    .exec(() => {
      console.log('Time over!')
    })
  // 6. play the animation
  play()
})
</script>

<template>
  <!-- 2. Set up the top component of VueMotion -->
  <Motion>
    <!-- 3. Add a widget called `Text` and set his wid (Widget ID) to "id" -->
    <Text wid="id">Hello world!</Text>
  </Motion>
</template>
```

There are some tips you need to notice:

1. Don't generate the external description, just codes.
2. The rotation unit is degree, not radian.
3. Your math skill is very low, so don't try to compute out the concrete value, just write out its performance.

# APIs

The current packages of VueMotion has been listed below.

| name                       | description                                                   |
| -------------------------- | ------------------------------------------------------------- |
| @vue-motion/core           | The core of VueMotion which include some core hooks and APIs. |
| @vue-motion/lib            | The basic graphs of VueMotion.                                |
| @vue-motion/extension-math | The math components of VueMotion.                             |

Every components and widgets has there relationships of inheritance, I'll mark it in each introduction of widgets.

The widgets can be divided as real widget and abstract widget. Abstarct widget **cannot** be used in the working. IN followings, we will mark the abstract widget with `*`.

The required property will be marked with `!`.

## `@vue-motion/lib`

This packages includes all of the basic graph such as rect, arc, text, and some usual animations.

### Widgets

#### *`Widget`

`Widget` is a **abstract** widget and all the widgets' parent, it include some properties most basic.

extends from: `none`

| property | type     | description                     | default     |
| -------- | -------- | ------------------------------- | ----------- |
| wid      | `string` | The Widget ID of the widget.    | `undefined` |
| x        | `number` | The x-coordinate of the widget. | `0`         |
| y        | `number` | The y-coordinate of the widget. | `0`         |
| scale-x  | `number` | The scale of the widget.        | `1`         |
| scale-y  | `number` | The scale of the widget.        | `1`         |
| rotation | `number` | The rotate of the widget.       | `0`         |
| opacity  | `number` | The opacity of the widget.      | `1`         |

#### `Group`

`Group` can be used to group some widgets together. It can be used to make some animations. Just include the widgets you want to group in the slots.

extends from: `Widget`

#### *`Figure`

Figure defined some properties of basic shapes.

extends from: `Widget`

| property        | type     | description                          | default                   |
| --------------- | -------- | ------------------------------------ | ------------------------- |
| fill-color      | `string` | The fill color of the figure.        | `"rgba(135,206,250,0.5)"` |
| border-color    | `string` | The stroke color of the figure.      | `"rgba(135,206,250,1)"`   |
| border-width    | `number` | The stroke width of the figure.      | `5`                       |
| border-interval | `number` | The stroke dasharray of the figure.  | `[1 ,0]`                  |
| border-offset   | `number` | The stroke dashoffset of the figure. | `0`                       |

#### `Arc`

extends from: `Figure`

| property | type     | description                 | default |
| -------- | -------- | --------------------------- | ------- |
| start    | `number` | The start angle of the arc. | `0`     |
| end      | `number` | The end angle of the arc.   | `360`   |
| !radius  | `number` | The radius of the arc.      | -       |

#### `Rect`

extends from: `Figure`

| property | type     | description                  | default |
| -------- | -------- | ---------------------------- | ------- |
| !width   | `number` | The width of the rectangle.  | -       |
| !height  | `number` | The height of the rectangle. | -       |

#### `Line`

extends from: `Figure`

| property | type               | description                  | default |
| -------- | ------------------ | ---------------------------- | ------- |
| !from    | `[number, number]` | The start point of the line. | -       |
| !to      | `[number, number]` | The end point of the line.   | -       |

#### `Polygon`

extends from: `Figure`

| property | type                      | description                | default |
| -------- | ------------------------- | -------------------------- | ------- |
| !points  | `Array<[number, number]>` | The points of the polygon. | -       |

#### `Path`

extends from: `Figure`

| property | type     | description      | default |
| -------- | -------- | ---------------- | ------- |
| !points  | `string` | The path string. | -       |

#### `Text`

extends from: `Figure`

| property       | type                                                                                                                                               | description                              | default     |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------- |
| font-family    | `string`                                                                                                                                           | The font family of the text.             | `undefined` |
| font-size      | `'xx-small' \| 'x-small' \| 'small' \| 'medium' \| 'large' \| 'x-large' \| 'xx-large' \| 'xxx-large' \| 'larger' \| 'smaller' \| string \| number` | The font size of the text.               | `undefined` |
| font-weight    | `number \| 'normal' \| 'bold' \| 'bolder' \| 'lighter'`                                                                                            | The font weight of the text.             | `undefined` |
| font-style     | `'normal' \| 'italic' \| 'oblique'`                                                                                                                | The font style of the text.              | `undefined` |
| align          | `'start' \| 'middle' \| 'end'`                                                                                                                     | The horizontal alignment of the text.    | `undefined` |
| baseline       | `'top' \| 'middle' \| 'bottom'`                                                                                                                    | The vertical alignment of the text.      | `undefined` |
| decoration     | `'none' \| 'underline' \| 'overline' \| 'line-through' \| 'blink'`                                                                                 | The text decoration style.               | `undefined` |
| word-spacing   | `number`                                                                                                                                           | The spacing between words in the text.   | `undefined` |
| letter-spacing | `number`                                                                                                                                           | The spacing between letters in the text. | `undefined` |

#### `TextUnit`

The base unit which can divide contents in `Text` to different styles.

extends from: `Text`

usage:

```vue
<Text>
  <TextUnit fill-color="skyblue">hello</TextUnit>
  <TextUnit fill-color="yellowgreen">world</TextUnit>
</Text>
```
