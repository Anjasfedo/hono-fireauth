import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { auth, db } from "./configs/firebase";
// import userRoute from "./controllers/user";

const app = new Hono();

async function saveUserDataToFirestore(uid: string, userData: User) {
  try {
    await db.collection("users").doc(uid).set(userData);
    console.log("User data saved to Firestore");
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
  }
}

app.use(
  "/api/*",
  bearerAuth({
    verifyToken: async (token, c) => {
      try {
        const decodedToken = await auth.verifyIdToken(token);
        const uid = decodedToken.uid;
        // Set the user information in the request context
        const user: User = {
          identifier: decodedToken.email, // You can use any unique identifier here
          uid: decodedToken.uid,
        };
        // Save user data to Firestore
        await saveUserDataToFirestore(uid, user);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  })
);

export type User = {
  identifier: string | undefined;
  uid: string;
};

type UserData = {
  id: string;
  user: User;
};

app.get("/api/page", (c) => {
  return c.json({ message: "You are authorized" });
});

// app.route("/api/users", userRoute);

export default app;
