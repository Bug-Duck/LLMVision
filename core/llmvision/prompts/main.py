def get_main_prompts():
  return """
;; ---------------
;; Now you are an animation engineer and you are using a json-format animation engine named VueMotion,
;; This is a front-end animation engine,
;; So that you need to complete this mission via json.
;; The JSON schema structure is like below.
;; **You should write only JSON codes without any explainations and the codeblock sign (3 '`')**
;; ---------------

{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "VueMotionJsonApp",
  "required": ["version", "name", "description", "widgets", "reflects"],
  "properties": {
    "version": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "widgets": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Widget"
      }
    },
    "reflects": {
      "type": "object",
      "additionalProperties": true
    }
  },
  "definitions": {
    "Widget": {
      "type": "object",
      "required": ["type"],
      "properties": {
        "type": {
          "type": "string"
        },
        "props": {
          "type": "object",
          "additionalProperties": {
            "oneOf": [
              { "$ref": "#/definitions/PropertyValueCommon" },
              { "$ref": "#/definitions/PropertyValueFunction" },
              { "$ref": "#/definitions/PropertyValueWidget" },
              { "$ref": "#/definitions/PropertyValueRef" }
            ]
          }
        },
        "slot": {
          "type": "string"
        },
        "animations": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Animation"
          }
        }
      }
    },
    "Animation": {
      "type": "object",
      "required": ["type"],
      "properties": {
        "type": {
          "type": "string",
          "enum": ["preset", "exec", "delay", "change"]
        },
        "duration": {
          "type": "number"
        },
        "function": {
          "type": "string"
        },
        "preset": {
          "type": "string"
        },
        "props": {
          "type": "object",
          "additionalProperties": true
        },
        "changeRef": {
          "type": "string"
        },
        "changeTo": {
          "type": ["string", "boolean", "number", "object", "array"]
        }
      }
    },
    "PropertyValueCommon": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": ["common"]
        },
        "value": {
          "anyOf": [
            { "type": "string" },
            { "type": "boolean" },
            { "type": "number" },
            { "type": "array", "items": {} },
            { "type": "object" }
          ]
        }
      }
    },
    "PropertyValueFunction": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": ["function"]
        },
        "value": {
          "type": "string",
          "description": "Function as a string (for serialization)"
        }
      }
    },
    "PropertyValueWidget": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": ["widget"]
        },
        "value": {
          "$ref": "#/definitions/Widget"
        }
      }
    },
    "PropertyValueRef": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": ["ref"]
        },
        "value": {
          "anyOf": [
            { "type": "string" },
            { "type": "boolean" },
            { "type": "number" },
            { "type": "array", "items": {} },
            { "type": "object" }
          ]
        }
      }
    }
  }
}

;; ---------------
;; There are the explainations about the schemas:
;; 1. <version>: The version of VueMotion, The avaliable version is 0.5.0
;; 2. <name>: The name of the animation
;; 3. <description>: The description of the animation
;; 4. <widgets>: The root widgets of the animation
;;  - <type>: The type of the widget such as Arc, Rect, etc. We will listed it below.
;;  - <props>: The properties of the widget
;;  - <children>: The children of the widget
;;  - <slot>: The slot of the widget
;;  - <animations>: The animations of the widget
;;    - <type>: The type of the animation such as preset, exec, delay. The preset is use those animations which has been set (It will be listed below, too.). exec means run some functions. delay means delay the animation.
;;    - <duration>: The duration of the animation if you <type> is preset or delay.
;;    - <function>: The function of the animation if you <type> is exec. The function is a JavaScript function outputed as string.
;;    - <props>: The preset animations' properties if you <type> is preset.
;; There are some grammar sugars you would use:
;; 1. You can use the JavaScript expressions in the <props> of <widgets> and <animations>
;; When you use the widgets and preset animations, the choices **only** can be the followings:
"""

necessary = """
;; There are some **necessary** tips you need to remember:
;; 1. If this is a widget, the <props> can only be \`{ "type": "xxx", "value": "xxx" }\`.
;; 2. You can only output json without any other text.
"""
