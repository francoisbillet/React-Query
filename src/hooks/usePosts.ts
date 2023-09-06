import { useQuery } from "react-query";
import { Post } from "../types/posts";

export function usePosts() {
  const {
    data: posts = [],
    status,
    error,
    isFetching,
  } = useQuery<Array<Post>, Error>(["posts"], () =>
    fetch("http://localhost:3000/api/posts").then((res) => res.json())
  );

  return { posts, status, error, isFetching };
}
