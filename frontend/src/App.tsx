import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import LoginForm from "./LoginForm";
import { auth, logout } from "./authService";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [nimi, setNimi] = useState("");

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



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    if (!user) return;

    const key = "codename_"+user.uid;
    const saved = localStorage.getItem(key);

    if (saved) {
      setNimi(saved);
    } else {
      let gen_name = eka[Math.floor(Math.random() * eka.length)] +" " + toka[Math.floor(Math.random() * toka.length)];

      localStorage.setItem(key, gen_name);
      setNimi(gen_name);
    }
  }, [user]);

  return (

    <div>
      {user ? (
        <>
          <p>👋 Tervetuloa, {nimi || user.email}</p>
          <button onClick={logout}>Kirjaudu ulos</button>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );

}

export default App