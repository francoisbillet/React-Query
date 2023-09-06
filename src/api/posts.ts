import { Post, PostRequest } from "../types/posts";

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
