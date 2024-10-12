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
