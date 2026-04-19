import {
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User,
  type UserCredential
} from "firebase/auth";

// import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig"

// const app = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseConfig);
/**
 * Kirjautuminen sähköposti + salasana
 */
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<User> => {
  const result: UserCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return result.user;
};

/**
 * Käyttäjän rekisteröinti (Ei tässä tehtävässä välttämätön)
 */
export const registerWithEmail = async (
  email: string,
  password: string
): Promise<User> => {
const result: UserCredential = await createUserWithEmailAndPassword(
  auth,
  email,
  password
);
return result.user;
};

/**
 * Kirjautuminen ulos
 */
export const logout = async (): Promise<void> => {
  await signOut(auth);
};