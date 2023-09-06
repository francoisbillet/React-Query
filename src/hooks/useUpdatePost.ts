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
      onMutate: async (newPost: Post) => {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({ queryKey: ["posts", newPost.id] });

        // Snapshot the previous value
        const previousPost = queryClient.getQueryData(["posts", newPost.id]);

        // Optimistically update to the new value
        queryClient.setQueryData(["posts", newPost.id], newPost);

        // Return a context with the previous and new todo
        return { previousPost, newPost };
      },
      // If the mutation fails, use the context we returned above
      onError: (err, newPost, context) => {
        queryClient.setQueryData(
          ["posts", context?.newPost.id],
          context?.previousPost
        );
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    }
  );
}
