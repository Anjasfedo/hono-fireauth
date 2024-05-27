import { initializeApp } from "firebase-admin/app";
import { credential } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

initializeApp({
  credential: credential.cert("serviceAccount.json"),
});

export const auth = getAuth();

export const db = getFirestore();
