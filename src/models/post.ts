import { db } from "../configs/firebase";

export type Post = {
  title: string;
  content: string;
};

type PostData = {
  id: string;
  post: Post;
};

export const getAllPosts = async (): Promise<PostData[]> => {
  const postsRef = db.collection("posts");
  const snapshot = await postsRef.get();

  const posts: PostData[] = [];

  snapshot.forEach((doc) => {
    const postData: Post = doc.data() as Post;
    const post: PostData = {
      id: doc.id,
      post: postData,
    };
    posts.push(post);
  });

  return posts;
};

export const getPostById = async (id: string): Promise<PostData | null> => {
  const docRef = db.collection("posts").doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  const postData: Post = doc.data() as Post;
  const post: PostData = {
    id: doc.id,
    post: postData,
  };

  return post;
};1

export const addPost = async (post: Post): Promise<string> => {
  const postsRef = db.collection("posts");
  const docRef = await postsRef.add(post);
  return docRef.id;
};
