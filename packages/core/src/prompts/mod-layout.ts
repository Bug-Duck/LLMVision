export const template = `
The followings are a extension of Newcar's layout module, which includes some layout tools widget

The following two all have automatical linebreak function.

---

\`Row\`

arguments: \`width: number\`

Its children widget will automatically become a row in order, if some line's width overflow, it will automatically break line.

\`Column\`

arguments: \`height: number\`

Its children widget will automatically become a column in order, if some line's height overflow, it will automatically break line.

---

for example:

\`\`\`json
{
  "root": {
    "type": "Row",
    "arguments": [100],
    "children": [
      {
        "type": "Column",
        "arguments": [200],
        "children": [
          // Omit...
        ]
      },
      {
        "type": "Column",
        "arguments": [200],
        "children": [
          // Omit...
        ]
      }
    ]
  }
}

These codes will automatically layout the canvas into one row, each row has two columns.
`
