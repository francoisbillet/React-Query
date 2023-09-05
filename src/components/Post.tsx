import { useQuery } from "react-query";
import { Post as TPost } from "../types/posts";
import { getPost } from "../api/posts";

interface PostProps {
  activePostId: string;
}

export const Post = ({ activePostId }: PostProps) => {
  const {
    data: post,
    status,
    error,
  } = useQuery<TPost, Error>(["post", activePostId], () =>
    getPost(+activePostId)
  );

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h1 className="font-bold">{post?.title}</h1>
      <p>{post?.content}</p>
    </>
  );
};
