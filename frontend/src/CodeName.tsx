import { useEffect, useState } from "react";
import styles from "./CodeName.module.css";

function CodeName() {
  const [nimi, setNimi] = useState("");


  // Käynnistää kyseisen koodin vain kerran kun komponentti käynnistetään
  // Viimeisenä olevaan listaan voi määrittää jotain johon reagoidaan. Jos jättää tyhjäksi käynnistyy ainoastaan kun komponentti ladataan ekan kerran.
  useEffect(() => {

    let ladattu = localStorage.getItem("codename")
    if (ladattu !== null) {
      setNimi(ladattu)
    }
  }, []);

  

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

  function handleGenerate() {
    setNimi(eka[Math.floor(Math.random() * eka.length)] +" "+ toka[Math.floor(Math.random() * toka.length)])
  }

  function handleSave() {
    localStorage.setItem("codename", nimi);
    alert("Tallennettu")
  }

  return(
    <>
      <h1>Tervetuloa: {nimi}!</h1>
      <div className={styles.container}>
          <button id="generate" className={styles.button} onClick={handleGenerate}>Luo käyttäjänimi</button>
          <button id="save" className={styles.button} onClick={handleSave}>Tallenna</button>
      </div>
    </>
  )
}


export default CodeName;