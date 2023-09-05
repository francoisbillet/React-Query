import { Post } from "../types/posts";

export type PostRequest = Omit<Post, "id">;

export async function getPosts(): Promise<Array<Post>> {
  return fetch("http://localhost:3000/api/posts").then((res) => res.json());
}

export async function getPost(postId: number): Promise<Post> {
  return fetch(`http://localhost:3000/api/posts/${postId}`).then((res) =>
    res.json()
  );
}

export async function createPost(newPost: PostRequest): Promise<Post> {
  return fetch("http://localhost:3000/api/posts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  }).then((res) => res.json());
}

export async function updatePost(
  postId: number,
  updatedPost: PostRequest
): Promise<Post> {
  return fetch(`http://localhost:3000/api/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  }).then((res) => res.json());
}
