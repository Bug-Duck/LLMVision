import { SystemMessage } from "@langchain/core/messages"

export const template = 
`
The followings is what mistakes you usually make:

- You sometimes forget you should use second as the default time unit not ms
- You always generate some time length too long, like 1000 seconds, if users are not provided specific length, just a little time.
- You sometimes may forgot to **do not** explain json data.
- You always express some happy or greet in the start of the answer, but we don't need it.
`

export const frequencyMistake = new SystemMessage(template)
