lib = {
    "Rect": {
        "desc": "Rect is a rectangle shape that extends from Figure.",
        "props": [
            {"name": "wid", "desc": "The Widget ID of the widget.", "default": None, "type": "string"},
            {"name": "x", "desc": "The x-coordinate of the widget.", "default": 0, "type": "number"},
            {"name": "y", "desc": "The y-coordinate of the widget.", "default": 0, "type": "number"},
            {"name": "scale-x", "desc": "The scale of the widget in the x direction.", "default": 1, "type": "number"},
            {"name": "scale-y", "desc": "The scale of the widget in the y direction.", "default": 1, "type": "number"},
            {"name": "rotation", "desc": "The rotation of the widget.", "default": 0, "type": "number"},
            {"name": "opacity", "desc": "The opacity of the widget.", "default": 1, "type": "number"},
            {"name": "width", "desc": "The width of the rectangle.", "default": 100, "type": "number"},
            {"name": "height", "desc": "The height of the rectangle.", "default": 100, "type": "number"}
        ]
    },
    "Arc": {
        "desc": "Arc represents an arc shape, extending from Figure.",
        "props": [
            {"name": "wid", "desc": "The Widget ID of the widget.", "default": None, "type": "string"},
            {"name": "x", "desc": "The x-coordinate of the widget.", "default": 0, "type": "number"},
            {"name": "y", "desc": "The y-coordinate of the widget.", "default": 0, "type": "number"},
            {"name": "scale-x", "desc": "The scale of the widget in the x direction.", "default": 1, "type": "number"},
            {"name": "scale-y", "desc": "The scale of the widget in the y direction.", "default": 1, "type": "number"},
            {"name": "rotation", "desc": "The rotation of the widget.", "default": 0, "type": "number"},
            {"name": "opacity", "desc": "The opacity of the widget.", "default": 1, "type": "number"},
            {"name": "start", "desc": "The start angle of the arc.", "default": 0, "type": "number"},
            {"name": "end", "desc": "The end angle of the arc.", "default": 360, "type": "number"},
            {"name": "radius", "desc": "The radius of the arc.", "default": None, "type": "number"}
        ]
    },
    "Line": {
        "desc": "Line represents a line shape, extending from Figure.",
        "props": [
            {"name": "wid", "desc": "The Widget ID of the widget.", "default": None, "type": "string"},
            {"name": "x", "desc": "The x-coordinate of the widget.", "default": 0, "type": "number"},
            {"name": "y", "desc": "The y-coordinate of the widget.", "default": 0, "type": "number"},
            {"name": "from", "desc": "The start point of the line.", "default": None, "type": "[number, number]"},
            {"name": "to", "desc": "The end point of the line.", "default": None, "type": "[number, number]"}
        ]
    },
    "Polygon": {
        "desc": "Polygon represents a polygon shape, extending from Figure.",
        "props": [
            {"name": "wid", "desc": "The Widget ID of the widget.", "default": None, "type": "string"},
            {"name": "x", "desc": "The x-coordinate of the widget.", "default": 0, "type": "number"},
            {"name": "y", "desc": "The y-coordinate of the widget.", "default": 0, "type": "number"},
            {"name": "points", "desc": "The points of the polygon.", "default": None, "type": "Array<[number, number]>"}
        ]
    },
    "Path": {
        "desc": "Path represents a custom path defined by a string, extending from Figure.",
        "props": [
            {"name": "wid", "desc": "The Widget ID of the widget.", "default": None, "type": "string"},
            {"name": "x", "desc": "The x-coordinate of the widget.", "default": 0, "type": "number"},
            {"name": "y", "desc": "The y-coordinate of the widget.", "default": 0, "type": "number"},
            {"name": "points", "desc": "The path string.", "default": None, "type": "string"}
        ]
    },
    "Text": {
        "desc": "Text allows rendering of text with styles, extending from Figure.",
        "props": [
            {"name": "wid", "desc": "The Widget ID of the widget.", "default": None, "type": "string"},
            {"name": "x", "desc": "The x-coordinate of the widget.", "default": 0, "type": "number"},
            {"name": "y", "desc": "The y-coordinate of the widget.", "default": 0, "type": "number"},
            {"name": "font-family", "desc": "The font family of the text.", "default": None, "type": "string"},
            {"name": "font-size", "desc": "The font size of the text.", "default": None, "type": "string | number"},
            {"name": "font-weight", "desc": "The font weight of the text.", "default": None, "type": "number | string"}
        ],
        "slot": {
            "desc": "The content of the text."
        }
    },
    "move": {
        "desc": "Move the component to a new position according to offset value",
        "props": [
            {"name": "duration", "desc": "The duration of the animation in milliseconds.", "type": "number"},
            {"name": "by", "desc": "The easing function of the animation.", "type": "(t: number) => number"},
            {"name": "offsetX", "desc": "The offset on x-coordinate value of the animation.", "type": "number"},
            {"name": "offsetY", "desc": "The offset on y-coordinate value of the animation.", "type": "number"}
        ]
    },
    "scale": {
        "desc": "Scale the component to a new size according to scale value",
        "props": [
            {"name": "duration", "desc": "The duration of the animation in milliseconds.", "type": "number"},
            {"name": "by", "desc": "The easing function of the animation.", "type": "(t: number) => number"},
            {"name": "offsetX", "desc": "The scale on x-coordinate value of the animation.", "type": "number"},
            {"name": "offsetY", "desc": "The scale on y-coordinate value of the animation.", "type": "number"}
        ]
    },
    "rotate": {
        "desc": "Rotate the component to a new angle according to rotate value",
        "props": [
            {"name": "duration", "desc": "The duration of the animation in milliseconds.", "type": "number"},
            {"name": "by", "desc": "The easing function of the animation.", "type": "(t: number) => number"},
            {"name": "offset", "desc": "The rotate value of the animation.", "type": "number"}
        ]
    }
}

def generate_document(data):
    result = []
    for item in data:
        component = lib.get(item, None)
        if component:
            doc_string = f"### {item}\n\n{component['desc']}\n\nThe properties choices only can be {', '.join([prop['name'] for prop in component['props']])}\n\n"
            doc_string += "\n".join([f"  - `{prop['name']}`: {prop['desc']} (type: {prop['type']})" for prop in component['props']])
            result.append(doc_string)
    return "\n".join(result)
