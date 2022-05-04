import os
import json

BASE_DIR = "node_modules/highlight.js/styles/base16"

doc = {}

for file_name in os.listdir(BASE_DIR):
    if file_name.endswith(".css"):
        with open(BASE_DIR + f"/{file_name}", "r") as file:
            code_string = "\n".join(file.readlines())
            doc[file_name[: file_name.find(".css")]] = code_string


with open("code_styles_config_base16.json", "w") as file:
    json.dump(doc, file)
