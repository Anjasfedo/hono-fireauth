import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { addPost, getAllPosts, getPostById, Post } from "../models/post";

const app = new Hono();

app.get("/", async (c) => {
  try {
    const posts = await getAllPosts();
    return c.json(posts);
  } catch (error) {
    console.error("Error getting posts: ", error);
    throw new HTTPException(404, { message: "Failed to fetch posts" });
  }
});

app.get("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const post = await getPostById(id);
    if (!post) {
      throw new HTTPException(404, { message: "Post not found" });
    }
    return c.json(post);
  } catch (error) {
    console.error("Error getting post by ID: ", error);
    throw new HTTPException(400, { message: "Failed to fetch post" });
  }
});


app.post("/", async (c) => {
  try {
    const post: Post = await c.req.json();
    const postId = await addPost(post);
    return c.json({ id: postId }, 201);
  } catch (error) {
    console.error("Error adding post: ", error);
    throw new HTTPException(400, { message: "Failed to add post" });
  }
});

export default app;