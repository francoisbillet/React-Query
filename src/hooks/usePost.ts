import { useQuery } from "react-query";
import { Post } from "../types/posts";

export function usePost(postId: number) {
  return useQuery<Post, Error>(["posts", postId], () =>
    fetch(`http://localhost:3000/api/posts/${postId}`).then((res) => res.json())
  );
}
