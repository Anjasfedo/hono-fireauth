import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { auth } from "@src/configs/firebase";
import { setUser, User } from "@src/models/user";
import postRoute from "@src/controllers/post";

const app = new Hono();

app.use(
  "/api/*",
  bearerAuth({
    verifyToken: async (token, c) => {
      try {
        const decodedToken = await auth.verifyIdToken(token);
        const uid = decodedToken.uid;

        const userRecord = await auth.getUser(uid);

        const user: User = {
          name: userRecord.displayName,
          identifier: userRecord.email,
          uid: userRecord.uid,
        };

        await setUser(uid, user);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  })
);

app.get("/api/page", (c) => {
  return c.json({ message: "You are authorized" });
});

app.route("/api/posts", postRoute);

export default app;
