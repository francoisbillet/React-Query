import { usePost } from "../hooks/usePost";

interface PostProps {
  activePostId: number;
}

export const Post = ({ activePostId }: PostProps) => {
  const { data: post, status, error } = usePost(activePostId);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <>
      <h2 className="font-bold">{post?.title}</h2>
      <p>{post?.content}</p>
    </>
  );
};
