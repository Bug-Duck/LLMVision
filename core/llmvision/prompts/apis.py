# Abstract
Widget = {
        "desc": "",
        "props": [
            {"name": "wid", "desc": "The Widget ID of the widget.", "default": None, "type": "string"},
            {"name": "x", "desc": "The x-coordinate of the widget.", "default": 0, "type": "number"},
            {"name": "y", "desc": "The y-coordinate of the widget.", "default": 0, "type": "number"},
            {"name": "scale-x", "desc": "The scale of the widget in the x direction.", "default": 1, "type": "number"},
            {"name": "scale-y", "desc": "The scale of the widget in the y direction.", "default": 1, "type": "number"},
            {"name": "rotation", "desc": "The rotation of the widget.", "default": 0, "type": "number"},
            {"name": "opacity", "desc": "The opacity of the widget.", "default": 1, "type": "number"},
        ]
    }

# Abstract
Figure = {
        "desc": "",
        "props": [
            *Widget["props"],
            {"name": "fill-color", "desc": "The fill color of the figure.", "default": "rgba(135,206,250,0.5)", "type": "string"},
            {"name": "border-color", "desc": "The border color of the figure.", "default": "rgba(135,206,250,1)", "type": "string"},
            {"name": "border-width", "desc": "The border width of the figure.", "default": 5, "type": "number"},
            {"name": "border-offset", "desc": "The offset value of border line", "default": 0, "type": "number"},
            {"name": "border-interval", "desc": "The interval value of border line", "default": [1, 0], "type": "[number, number]"}
        ]
}

lib = {
    
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
