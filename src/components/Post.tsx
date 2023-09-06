import { PostRequest } from "../types/posts";
import { PostForm } from "./PostForm";
import { usePost } from "../hooks/usePost";
import { useUpdatePost } from "../hooks/useUpdatePost";

interface PostProps {
  activePostId: number;
}

export const Post = ({ activePostId }: PostProps) => {
  const { data: post, status, error, isFetching } = usePost(activePostId);
  const { mutate: updatePost, status: updatePostStatus } =
    useUpdatePost(activePostId);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error?.message}</span>;
  }

  function onSubmit(values: PostRequest) {
    updatePost({ ...values, id: activePostId });
  }

  return (
    <>
      <div className="flex gap-1 items-center">
        <h2 className="font-bold">{post?.title}</h2>
        {isFetching && <small>Updating...</small>}
      </div>
      <p>{post?.content}</p>
      <hr className="border-gray-600 my-1" />
      <div>
        <h2 className="font-bold">Edit Post</h2>
        <PostForm
          initialValues={{ title: post!.title, content: post!.content }}
          onSubmit={onSubmit}
        />
        {updatePostStatus === "loading" && <div>Loading...</div>}
      </div>
    </>
  );
};
