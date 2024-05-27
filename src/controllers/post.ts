import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import {
  createPost,
  deletePostById,
  getAllPosts,
  getPostById,
  Post,
  updatePostById,
} from "@src/models/post";

const app = new Hono();

app.get("/", async (c) => {
  try {
    const posts = await getAllPosts();
    return c.json(posts);
  } catch (error: any) {
    console.error("Error getting posts: ", error);
    throw new HTTPException(404, { message: error.message });
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
  } catch (error: any) {
    console.error("Error getting post by ID: ", error);
    throw new HTTPException(400, { message: error.message });
  }
});

app.post("/", async (c) => {
  try {
    const post: Post = await c.req.json();
    const postId = await createPost(post);
    return c.json({ id: postId }, 201);
  } catch (error: any) {
    console.error("Error adding post: ", error);
    throw new HTTPException(400, { message: error.message });
  }
});

app.put("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const post: Post = await c.req.json();
    await updatePostById(id, post);
    return c.json({ message: "Post updated successfully" });
  } catch (error: any) {
    console.error("Error updating post: ", error);
    throw new HTTPException(400, { message: error.message });
  }
});

app.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    await deletePostById(id);
    return c.json({ message: "Post deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting post: ", error);
    throw new HTTPException(400, { message: error.message });
  }
});

export default app;
