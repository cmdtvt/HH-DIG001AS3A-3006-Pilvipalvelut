import { useState, useEffect, useCallback } from 'react'

import './App.css'
import LoginForm from './LoginForm';
import { auth, logout } from './authService';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { getOrCreateCodename } from './codename/codenameService';
import { QuizForm } from './components/QuizForm';
import { createSession, subscribeToSession } from './game/gameSessionService';
import { resolveRound } from './game/gameController';
import { type Session } from './types/Session';
import ConsentBanner from './components/ConsentBanner';
// import { type Player } from './types/Player';

function App() {
	const [session, setSession] = useState<Session | null>(null);
	const [codename, setCodename] = useState<string>("");
	const [user, setUser] = useState<User | null>(null);

	function getConsent(): boolean | null {
		const value = localStorage.getItem('consent');
		if (value === null) return null;
		return value === "true";
	}

	function useCloudflareAnalytics() {
		const trackEvent = useCallback(
			(eventName: string, data?: Record<string, any>) => {
			if (!getConsent()) return; // Jos haluaa tarkistaa 6.1 kohdan consentin
			if (!window._cfq) {
				window._cfq = [];
			}

			window._cfq.push([
				"trackEvent",
				{
				name: eventName,
				...data,
				timestamp: new Date().toISOString(),
				},
			]);
			},
			[]
		);

		return { trackEvent };
	}
	useCloudflareAnalytics()

	// function RouteAnalytics() {
	// 	// const location = useLocation(); // Tämä voin jos käyttä router:ia
	// 	const { trackEvent } = useCloudflareAnalytics();  
	// 	const initialReferrer = useRef<string>(
	// 		document.referrer || "direct"
	// 	);

	// 	useEffect(() => {
	// 		trackEvent("page_view", {
	// 		referrer: initialReferrer.current,
	// 		landingPath: window.location.pathname,
	// 		//path: location.pathname
	// 		});
	// 	}, [trackEvent]);

	// 	return null;
	// }


	useEffect(() => {

		//https://firebase.google.com/docs/auth/web/manage-users
		const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
			if (!firebaseUser) {
				setUser(null);
				return;
			}
			setUser(firebaseUser);


			const name = getOrCreateCodename(firebaseUser.uid);
			setCodename(name);

			const sessionId = await createSession({
				name: name + "n-arvaussessio",
				creatorName: name,
				creatorId: firebaseUser.uid
			});


			subscribeToSession(sessionId, (updatedSession) => {
				setSession(updatedSession);
			});
		});

		return () => unsubscribeAuth();
	}, []);


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
			// {session ? Object.values(session.players) : []}
            currentUserId={codename}
          />
        </div>
      </section>
      <section id="spacer"></section>
	  <ConsentBanner></ConsentBanner>
    </>
  )
}

export default App