import { useMutation, useQuery, useQueryClient } from "react-query";
import { Post as TPost } from "../types/posts";
import { PostRequest, getPost, updatePost } from "../api/posts";
import { PostForm } from "./PostForm";

interface PostProps {
  activePostId: number;
}

export const Post = ({ activePostId }: PostProps) => {
  const queryClient = useQueryClient();

  const {
    data: post,
    status,
    error,
  } = useQuery<TPost, Error>(["posts", activePostId], () =>
    getPost(activePostId)
  );

  const mutation = useMutation(
    (updatedPost: TPost) => updatePost(activePostId, updatedPost),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  //? When is this happening ?
  if (status === "idle") {
    return <span>Idle ?</span>;
  }

  function onSubmit(values: PostRequest) {
    mutation.mutate({ ...values, id: activePostId });
  }

  return (
    <>
      <h2 className="font-bold">{post.title}</h2>
      <p>{post.content}</p>
      <hr className="border-gray-600 my-1" />
      <div>
        <h2 className="font-bold">Edit Post</h2>
        <PostForm
          initialValues={{ title: post.title, content: post.content }}
          onSubmit={onSubmit}
        />
        {mutation.isLoading && <div>Loading...</div>}
      </div>
    </>
  );
};
