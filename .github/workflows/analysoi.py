import os

# Dictionaryt haettavista tiedoista.
extensions = {".js":"Javascript",".py":"Python",".ts":"Typescript",".java":"Java",".css":"CSS",".html":"HTML"}
heuristics = {
    "Singleton": {
        "search": ["getInstance", "static instance"],
        "found": False
    },
    "Factory Method": {
        "search": ["create", "factory"],
        "found": False
    },
    "Observer": {
        "search": ["notify", "subscribe", "observer"],
        "found": False
    },
    "Strategy": {
        "search": ["Strategy", "interface"],
        "found": False
    },
    "Decorator": {
        "search": ["Decorator", "wrap"],
        "found": False
    }
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
        #print(ext[1])

        # Käsitellään 
        if ext[1] in storage.keys():
            storage[ext[1]]["data"].append(ext[0])

        
        # Jos avatusta tiedostosta löytyy definattu sana asetetaan found trueksi
        # Olisi ollut järkevää tehdä tuo toinen haku samalla tavalla koska paljon yksinkertaisempi kuin rakentaa tietovarasto eri paikkaan
        # storage muuttuja antaa kumminkin mahdollisuuden tallentaa enemmän tietoa jos sitä halutaan ulos tulevaisuudessa.
        with open(path, encoding="utf-8", errors="ignore") as f:
            for method, data in heuristics.items():
                # if data["search"] in f.read():
                #     data["found"] = True

                for searched in data["search"]:
                    if searched in f.read():
                        data["found"] = True



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


report_write("\n\nDesign patterns found: ")
for method, s in heuristics.items():
    # Jos storage["data"] lista ei ole tyhjä
    if s["found"]:
        report_write("Found: {0}".format(method))

with open("analysis_report.txt", "w") as f:
    f.write(report_text)

