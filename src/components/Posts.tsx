import { useQuery } from "react-query";
import { getPosts } from "../api/posts";
import { Post } from "../types/posts";

export const Posts = () => {
  const { data } = useQuery<Array<Post>>("posts", getPosts);

  console.log(data);
  return <div className="text-emerald-400">Posts</div>;
};
