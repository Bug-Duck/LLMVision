import json
from zhipuai import ZhipuAI
from prompts.apis import generate_document
from prompts.main import get_main_prompts
from prompts.choice import get_choice_prompts

def generate(
  requirement: str,
  key: str,
  model: str = "glm-4-flash",
  max_tokens: int = 8192,
) -> dict:
  client = ZhipuAI(
    api_key=key
  )
  unprocesses = client.chat.completions.create(
    model=model,
    max_tokens=max_tokens,
    messages=[
      {
        "role": "assistant",
        "content": get_choice_prompts()
      },
      {
        "role": "user",
        "content": requirement
      }
    ]
  )
  choices = json.loads(unprocesses.choices[0].message.content.replace('```json', '').replace('```', ''))
  print(choices)
  final_asnwer = client.chat.completions.create(
    model=model,
    max_tokens=max_tokens,
    messages=[
      {
        "role": "assistant",
        "content": get_main_prompts() + "\n" + generate_document(choices)
      },
      {
        "role": "user",
        "content": requirement + "\n" + "Now please generate VueJS Codes without any other text: "
      }
    ]
  )
  processed = final_asnwer.choices[0].message.content
  print(processed)
  return processed