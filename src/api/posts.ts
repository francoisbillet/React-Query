import { Post } from "../types/posts";

export async function getPosts(): Promise<Array<Post>> {
  return fetch("http://localhost:3000/api/posts").then((res) => res.json());
}

export async function getPost(postId: number): Promise<Post> {
  return fetch(`http://localhost:3000/api/posts/${postId}`).then((res) =>
    res.json()
  );
}
