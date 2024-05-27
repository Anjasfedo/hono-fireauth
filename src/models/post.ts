import { db } from "@src/configs/firebase";

export type Post = {
  title: string;
  content: string;
};

type PostData = {
  id: string;
  post: Post;
};

export const getAllPosts = async () => {
  try {
    const postsRef = db.collection("posts");
    const snapshot = await postsRef.get();

    if (snapshot.empty) {
      return [];
    }

    const posts: PostData[] = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const postData: Post = doc.data() as Post;
        const post: PostData = {
          id: doc.id,
          post: postData,
        };
        return post;
      })
    );

    return posts;
  } catch (error) {
    console.error("Failed to get posts:", error);
    throw new Error("Failed to get post");
  }
};

export const getPostById = async (id: string) => {
  try {
    const docRef = db.collection("posts").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      console.warn(`No document found with ID: ${id}`);
      return null;
    }

    const postData: Post = doc.data() as Post;
    const post: PostData = {
      id: doc.id,
      post: postData,
    };

    return post;
  } catch (error) {
    console.error(`Failed to get post with ID ${id}:`, error);
    throw new Error("Failed to get post");
  }
};

export const createPost = async (post: Post) => {
  try {
    const postsRef = db.collection("posts");
    const docRef = await postsRef.add(post);
    return docRef.id;
  } catch (error) {
    console.error("Failed to create post:", error);
    throw new Error("Failed to create post");
  }
};

export const updatePostById = async (id: string, post: Post) => {
  try {
    const docRef = db.collection("posts").doc(id);
    await docRef.update(post);
  } catch (error) {
    console.error(`Failed to update post with ID ${id}:`, error);
    throw new Error("Failed to update post");
  }
};

export const deletePostById = async (id: string) => {
  try {
    const docRef = db.collection("posts").doc(id);
    await docRef.delete();
  } catch (error) {
    console.error(`Failed to delete post with ID ${id}:`, error);
    throw new Error("Failed to delete post");
  }
};
