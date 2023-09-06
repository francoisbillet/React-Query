import { useMutation, useQueryClient } from "react-query";
import { PostRequest } from "../types/posts";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation(
    (newPost: PostRequest) =>
      fetch("http://localhost:3000/api/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    }
  );
}
