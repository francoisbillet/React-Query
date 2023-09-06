import { usePost } from "../hooks/usePost";

interface PostProps {
  activePostId: number;
}

export const Post = ({ activePostId }: PostProps) => {
  const { data: post, status, error, isFetching } = usePost(activePostId);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <>
      <div className="flex gap-1 items-center">
        <h2 className="font-bold">{post?.title}</h2>
        {isFetching && <small>Updating...</small>}
      </div>
      <p>{post?.content}</p>
    </>
  );
};
