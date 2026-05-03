import { addDoc, collection, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import type { Session } from "../types/Session";
import { db } from "../firebaseConfig";



export async function createSession({name,creatorName,creatorId}: {
	name: string;
	creatorName: string;
	creatorId: string;
}): Promise<string> {

	const docRef = await addDoc(collection(db, "sessions"), {
		sessionName: name,
		status: "waiting",
		currentRound: 0,

		players: {
			[creatorId]: {
				codename: creatorName,
				score: 0
			}
		},

		guesses: {},

		createdAt: serverTimestamp(),
		createdBy: creatorId
	});

  return docRef.id;
}

export function subscribeToSession(sessionId: string, cb: (session: Session) => void) {
	const ref = doc(db, "sessions", sessionId);

	return onSnapshot(ref, (docSnap) => {
		if (docSnap.exists()) {
			cb({ id: docSnap.id, ...docSnap.data() } as Session);
		}
	});
}