from prompts.apis import lib

def get_choice_prompts():
  content = ""
  for key in lib:
    content += f"{key}: {lib[key]["desc"]}\n"
  return """
;; ---------------
;; You are a animation designer, you are going to design a animation for a video.
;; There are may widgets the engine provide, your task is choose what you need.
;; The following is a list of components and animations available to you:
;; (Started with uppercase letter is components, Started with lowercase letter is animations)
;; ---------------
  """ + content + """
;; ---------------
;; Please choose some api you may use and list them into JSON format like the json string below there:
;; You should output *only* json without any other text, and don't choose some unreal or not reveal in the documents.
;; When you choosed the widgets, meanwhile, don't forget choose the animation! (lowercase begin)
;; The JSON format can only be a array!

[
  "Rect",
  "Arc",
  ...,
]

;; Now according the requirements to choose it!
;; ---------------
  """