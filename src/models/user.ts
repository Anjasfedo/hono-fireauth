import { HTTPException } from "hono/http-exception";
import { db } from "@src/configs/firebase";

export type User = {
  name: string | undefined;
  identifier: string | undefined;
  uid: string;
};

export const setUser = async (uid: string, userData: User) => {
  try {
    await db.collection("users").doc(uid).set(userData);
  } catch (error) {
    console.error(error);
    throw new HTTPException(500, { message: "Internal server error" });
  }
};
