export const template = `
The followings are a extension of Newcar's math module, which includes many mathematical widget.

When you need to use a math function, you can use the following syntax:

- fn(() => {}) (for example: "fn(() => 4)"), notice it is a string, You must use fn to include the function and don't use any JavaScript native variable. If you want to use some special variable, you can use the concrete number.
- calc(foundations) (for example: "calc(Math.PI)", notice it is a string), please use it when you want to use JavaScript native variable.

Notice: you always use some variable not be in function, please use the concrete number instead them.

# \`MathFunction\`

Before start, we need to know the relationship between the real position, math position and the division. No matter how to change, the real position will equals to math position times division. The real position is x, y, The math position is domain and range.

Notice: arguments is a array, not object!

arguments: \`fn: () => number, domain: [number, number]\`

options:

\`\`\`ts
export interface MathFunctionOptions extends WidgetOptions {
  divisionY?: number
  divisionX?: number
  lineWidth?: number
  style?: MathFunctionStyle
  numberRange?: Range
}

export interface MathFunctionStyle extends WidgetStyle {
  color?: Color
  shader?: Shader
  width?: number
}
\`\`\`

example:

\`\`\`json
{
  "type": "MathFunction",
  "arguments": [
    "fn((x) => Math.sin(x))",
    [-3.14, 3.14] // Please use concrete number instead of variable
  ].
  "options": {
    // Omit
  }
}

you can use the animation \`create\` to have a try.

If the type is MathFunction, please do not use \`stroke\` animation, use \`create\` to instead, because the \`stroke\` animation is not supported on \`MathFunction\`

# \`NumberPlane\`

NumberPlane has an x axis and a y axis, and the x axis is horizontal, the y axis is vertical. The x axis is from left to right, the y axis is from bottom to top.

arguments: \`lengthX: [number, number], lengthY: [number, number]\`

The lengthX and lengthY are the range of the x axis and y axis, the unit is pixel in common scale. For example, if you want to draw a number plane with a range of -10 to 10, and the divisionX and divisionY as all 50, you can set lengthX to [-500, 500] and lengthY to [-500, 500].

options:

\`\`\`ts
export interface NumberPlaneOptions extends WidgetOptions {
  style?: NumberPlaneStyle
  divisionX?: number
  divisionY?: number
  trendsX?: Trend
  trendsY?: Trend
}

export interface NumberPlaneStyle extends WidgetStyle {
  colorX?: Color
  colorY?: Color
  textColorX?: Color
  textColorY?: Color
  textSizeX?: number
  textSizeY?: number
  textsX?: boolean
  textsY?: boolean
  ticksX?: boolean
  ticksY?: boolean
  tickColorX?: Color
  tickColorY?: Color
  grid?: boolean
  gridColor?: Color
  gridWidth?: number
}
\`\`\`

\`Trend\` is a function type, it takes a number and returns a number.

for example, the default trend is: \`options.trendsX ?? (x => x / 50)\`

It expressed that every tick on the x axis is 50 pixel apart.

tick: the small line on the axis, it is used to mark the position of the axis.

grid: the line between the axis, it is used to mark the position of the axis.

If user want to generate a function, in default, we use \`NumberPlane\` as the parent widget.

# \`NumberAxis\`

A number axis is a widget that can be used to display a number line.

arguments: \`length: [number, number]\`

options:

\`\`\`typescript
export interface NumberAxisOptions extends WidgetOptions {
  style?: NumberAxisStyle

  /**
   * The ratio of pixels to 1 tick, i.e. the division value
   */
  division?: number

  /**
   * The trend of the axis, i.e. the function that maps the division to the axis value
   * For example, if the division is 50, the trend is (x => x / 50), this is default value, too
   */
  trend?: Trend
}

export interface NumberAxisStyle extends WidgetStyle {
  /**
   * If display ticks.
   */
  ticks?: boolean
  tickColor?: Color

  /**
   * if display the number or text under the ticks of the axis
   */
  texts?: boolean
  textColor?: Color
  textSize?: number

  /**
   * The color of the axis
   */
  color?: Color
}
\`\`\`

`