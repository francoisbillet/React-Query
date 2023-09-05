import { useQuery } from "react-query";
import { getPosts } from "../api/posts";
import { Post as TPost } from "../types/posts";

interface PostsProps {
  changeActivePostId: (postId: string) => void;
}

export const Posts = ({ changeActivePostId }: PostsProps) => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<Array<TPost>, Error>("posts", getPosts);

  function displayPosts() {
    if (isLoading) {
      return <span>Loading...</span>;
    }

    if (isError) {
      return <span>Error: {error.message}</span>;
    }

    return (
      <ul>
        {posts?.map((post: TPost) => (
          <li key={post.id}>
            <a
              href="#"
              onClick={() => changeActivePostId(String(post.id))}
              className="underline"
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <h1 className="font-bold">Posts</h1>
      {displayPosts()}
    </>
  );
};
