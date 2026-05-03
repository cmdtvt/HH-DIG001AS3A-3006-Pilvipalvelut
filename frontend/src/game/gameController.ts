import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

import type { Session } from "../types/Session";


export function resolveRound(session:Session, guess:number) {
    console.log(session.id);
    console.log(guess);
    return "adada"
}


// https://firebase.google.com/docs/firestore/manage-data/add-data#set_a_document

export async function submitGuess(sessionId: string,userId: string,guess: number) {
    const ref = doc(db, "sessions", sessionId);

    await updateDoc(ref, {
        [`players.${userId}.guess`]: guess
    });
}