import { useState, useEffect } from 'react'

import './App.css'
import LoginForm from './LoginForm';
import { auth, logout } from './authService';
import { onAuthStateChanged, type User } from 'firebase/auth';
// import { getOrCreateCodename } from './codenameService';
import { QuizForm } from './components/QuizForm';
// import { createSession } from './gameSessionService';
// import { resolveRound } from './gameController';
import { type Session } from './types/Session';
import { type Player } from './types/Player';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [codename, setCodename] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  // Initialize count from localStorage on mount
  useEffect(() => {
    const storedCount = localStorage.getItem('laskuri');
    if (storedCount) {
      setCount(parseInt(storedCount, 10));
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      const name = getOrCreateCodename(firebaseUser!.uid);
      setCodename(name);
      setSession(await createSession({ name: name + "n-arvaussessio", creatorName: name }));
    });

    return () => unsubscribe();   
  }, [])


  function submitGuess(guess: number): void {
    if ( session ) {
      try {
        resolveRound(session, guess);
      } catch (error) {
        console.error("Kierroksen luonti epäonnistui: ", error);
      }  
    }
  }

  return (
    <>
      <section id="center">

        <div>
          <h1>Heippa maailma!</h1>
        </div>

        <div>
          {user ? (
            <>
              <p>👋 Tervetuloa, {codename}</p>
              <button onClick={logout}>Kirjaudu ulos</button>
            </>
          ) : (
            <LoginForm />
          )}
        </div>

        <div>
          <QuizForm 
            onSubmitGuess={(guess) => submitGuess(guess)} 
            players={[]} 
            currentUserId={codename}
          />
        </div>
      </section>
      <section id="spacer"></section>
    </>
  )
}

export default App