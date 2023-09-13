import { useMutation, useQueryClient } from "react-query";
import { Post } from "../types/posts";
import axios from "axios";

export function useUpdatePost(postId: number) {
  const queryClient = useQueryClient();

  return useMutation(
    (updatedPost: Post) =>
      axios.put(`http://localhost:3000/api/posts/${postId}`, {
        title: updatedPost.title,
        content: updatedPost.content,
      }),
    {
      onMutate: async (updatedPost: Post) => {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({
          queryKey: ["posts", updatedPost.id],
        });

        // Snapshot the previous value
        const previousPost = queryClient.getQueryData([
          "posts",
          updatedPost.id,
        ]);

        // Optimistically update to the new value
        queryClient.setQueryData(["posts", updatedPost.id], updatedPost);

        // Return a context with the previous and updated post
        return { previousPost };
      },
      // If the mutation fails, use the context we returned above
      onError: (error, updatedPost, context) => {
        console.log("error : ", error);
        queryClient.setQueryData(
          ["posts", updatedPost.id],
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
