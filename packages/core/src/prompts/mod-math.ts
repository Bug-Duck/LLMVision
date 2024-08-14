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
`