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
  const getPost = usePost(activePostId);
  const updatePost = useUpdatePost(activePostId);
  const deletePost = useDeletePost();

  if (getPost.status === "loading") {
    return <span>Loading...</span>;
  }

  if (getPost.status === "error") {
    return <span>Error: {getPost.error?.message}</span>;
  }

  function onSubmit(values: PostRequest) {
    updatePost.mutate({ ...values, id: activePostId });
  }

  async function onDelete() {
    await deletePost.mutateAsync(activePostId);
    changeActivePostId(null);
  }

  return (
    <>
      <div className="flex gap-1 items-center">
        <h2 className="font-bold">{getPost.data?.title}</h2>
        {getPost.isFetching && <small>Updating...</small>}
      </div>
      <p>{getPost.data?.content}</p>
      <button onClick={onDelete} className="bg-amber-400 p-1">
        Delete Post
      </button>
      {deletePost.status === "loading" && <div>Deleting...</div>}
      <hr className="border-gray-600 my-1" />
      <div>
        <h2 className="font-bold">Edit Post</h2>
        <PostForm
          initialValues={{
            title: getPost.data!.title,
            content: getPost.data!.content,
          }}
          onSubmit={onSubmit}
        />
        {updatePost.status === "loading" && <div>Loading...</div>}
      </div>
    </>
  );
};
