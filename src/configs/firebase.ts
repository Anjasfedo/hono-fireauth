import { initializeApp } from "firebase-admin/app";
import { credential } from "firebase-admin";

const app = initializeApp({ credential: credential.cert()});