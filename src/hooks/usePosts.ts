import { useQuery } from "react-query";
import { Post } from "../types/posts";

export function usePosts() {
  return useQuery<Array<Post>, Error>(["posts"], () =>
    fetch("http://localhost:3000/api/posts").then((res) => res.json())
  );
}
