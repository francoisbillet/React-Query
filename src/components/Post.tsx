import { PostRequest } from "../types/posts";
import { PostForm } from "./PostForm";
import { usePost } from "../hooks/usePost";
import { useUpdatePost } from "../hooks/useUpdatePost";
import { useDeletePost } from "../hooks/useDeletePost";

interface PostProps {
  activePostId: number;
  changeActivePostId: (postId: number | null) => void;
}

export const Post = ({ activePostId, changeActivePostId }: PostProps) => {
  const { data: post, status, error } = usePost(activePostId);
  const { mutate: updatePost, status: updatePostStatus } =
    useUpdatePost(activePostId);
  const { mutate: deletePost } = useDeletePost();

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error?.message}</span>;
  }

  function onSubmit(values: PostRequest) {
    updatePost({ ...values, id: activePostId });
  }

  async function onDelete() {
    deletePost(activePostId);
    changeActivePostId(null);
  }

  return (
    <>
      <h2 className="font-bold">{post?.title}</h2>
      <p>{post?.content}</p>
      <button onClick={onDelete} className="bg-amber-400 p-1">
        Delete Post
      </button>
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
