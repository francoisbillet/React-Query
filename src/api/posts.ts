import { Post } from "../types/posts";
import { wait } from "./utils";

export const getPosts = async (): Promise<Array<Post>> => {
  return wait(2000).then(() =>
    fetch("/data/posts.json").then((res) => res.json())
  );
};
