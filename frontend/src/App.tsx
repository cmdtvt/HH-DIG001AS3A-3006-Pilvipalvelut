import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import LoginForm from "./LoginForm";
import { auth, logout } from "./authService";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  return (

    <div>
      {user ? (
        <>
          <p>👋 Tervetuloa, {user.email}</p>
          <button onClick={logout}>Kirjaudu ulos</button>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );

}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAGI-jQwX14gGvOnUOiynVzvzDwquP5sCg",
  authDomain: "vite-pilvi-dd6f9.firebaseapp.com",
  projectId: "vite-pilvi-dd6f9",
  storageBucket: "vite-pilvi-dd6f9.firebasestorage.app",
  messagingSenderId: "81009303467",
  appId: "1:81009303467:web:f7b49ef859d3bb79d47cee"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);

export default App;
