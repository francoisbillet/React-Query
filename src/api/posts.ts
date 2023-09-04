import { Post } from "../types/posts";
import { wait } from "./utils";

export const getPosts = async (): Promise<Array<Post>> => {
  return wait(2000).then(() =>
    fetch("http://localhost:3000/api/posts").then((res) => res.json())
  );
};
