import { initializeApp } from "firebase-admin/app";
import { credential } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

const app = initializeApp({ credential: credential.cert('serviceAccount.json')});

export const auth = getAuth()