import { Post as TPost } from "../types/posts";
import { usePosts } from "../hooks/usePosts";

interface PostsProps {
  changeActivePostId: (postId: number) => void;
}

export function Posts({ changeActivePostId }: PostsProps) {
  const { posts, status, error } = usePosts();

  function displayPosts() {
    if (status === "loading") {
      return <span>Loading...</span>;
    }

    if (status === "error") {
      return <span>Error : {error?.message}</span>;
    }

    return (
      <ul>
        {posts.map((post: TPost) => (
          <li key={post.id}>
            <a
              href="#"
              onClick={() => changeActivePostId(post.id)}
              className="underline text-blue-500"
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h2 className="font-bold">Posts</h2>
        {displayPosts()}
      </div>
    </div>
  );
}
