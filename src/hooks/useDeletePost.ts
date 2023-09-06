import { useMutation, useQueryClient } from "react-query";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation(
    (postId: number) =>
      fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries("posts");
      },
    }
  );
}
