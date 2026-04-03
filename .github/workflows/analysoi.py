import os

# Luodaan storage johon luodaan dynaamisesti varasto skannattaville tiedostoille haluttavista päätteistä
extensions = {".js":"Javascript",".py":"Python",".ts":"Typescript",".java":"Java"}
storage = {}
for e, name in extensions.items():
    storage[e] = {
        "ext" : e,
        "name" : name,
        "data" : []
    }

# Käydään projektin direktory läpi tiedosto kerrallaan
for root, dirs, files in os.walk("."):
    for file in files:
        path = os.join(root, file)
        
        
        # https://stackoverflow.com/questions/541390/extracting-extension-from-filename
        ext = path. os.path.splitext(path)

        # Käsitellään 
        if ext in storage.keys:
            storage[ext]["data"].append(ext)




# Kun data on kerätty luodaan raportti

print("Detected lanquages: ")
for s in storage:

    # Jos storage["data"] lista ei ole tyhjä
    if s["data"]:
        print("Found: {0}".format(s["name"]))

        

