import { useMutation, useQueryClient } from "react-query";
import { Post } from "../types/posts";

export function useUpdatePost(postId: number) {
  const queryClient = useQueryClient();

  return useMutation(
    (updatedPost: Post) =>
      fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
}
