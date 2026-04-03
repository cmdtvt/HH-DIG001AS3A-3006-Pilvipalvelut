import os

# Dictionaryt haettavista tiedoista.
extensions = {".js":"Javascript",".py":"Python",".ts":"Typescript",".java":"Java",".css":"CSS",".html":"HTML"}
heuristics = {
    "Singleton": [
        "getInstance",
        "static instance"
    ],

    "Factory Method": [
        "create",
        "factory"
    ],

    "Observer": [
        "notify",
        "subscribe",
        "observer"
    ],

    "Strategy": [
        "Strategy",
        "interface"
    ],

    "Decorator": [
        "Decorator",
        "wrap"
    ]
}

# Luodaan storage johon luodaan dynaamisesti varasto skannattaville tiedostoille haluttavista päätteistä
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
        #print("Scanning"+str(file))
        path = os.path.join(root, file)
        
        
        # https://stackoverflow.com/questions/541390/extracting-extension-from-filename
        # Palauttaa tuple (sijainti, pääte)
        ext = os.path.splitext(path)
        print(ext[1])

        # Käsitellään 
        if ext[1] in storage.keys():
            storage[ext[1]]["data"].append(ext[0])



report_text = ""
def report_write(text):

    print(text)

    global report_text #Kerätään koko teksti joka menee raporttiin
    report_text += text + "\n"

# Kun data on kerätty luodaan raportti
report_write("Detecting lanquages: ")
for s in storage.values():

    # Jos storage["data"] lista ei ole tyhjä
    if s["data"]:
        report_write("Found: {0}".format(s["name"]))


with open("analysis_report.txt", "w") as f:
    f.write(report_text)




