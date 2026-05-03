
let eka = [
    "Kenraali",
    "Tohtori",
    "Mestari",
    "Kalkkuna",
    "Presidentti",
    "Eversti",
    "Suomen",
    "Rehtori"
]

let toka = [
    "Kalkkuna",
    "Pelaaja",
    "Voima",
    "Voittaja",
    "Ilmoittaja",
    "Majuri",
    "Tohtori Mestari",
    "Kokki",
    "Bruutus",
    "Murskaaja",
    "Purkaja",
    "Kehittäjä",
    "Golffari",
]

function generate() {
    return eka[Math.floor(Math.random() * eka.length)] +" "+ toka[Math.floor(Math.random() * toka.length)]
}

function handleGenerate() {
    setNimi(generate())
}


function handleSave(nimi:string) {
    localStorage.setItem("codename", nimi);
    alert("Tallennettu")
}

export function getOrCreateCodename(uid: string): string {
    const key = `codename_${uid}`;
    let name = localStorage.getItem(key);

    if (!name) {
        name = generate();
        localStorage.setItem(key, name);
    }

    return name;
}
