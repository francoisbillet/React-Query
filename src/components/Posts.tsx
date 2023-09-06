import { PostRequest, Post as TPost } from "../types/posts";
import { PostForm } from "./PostForm";
import { usePosts } from "../hooks/usePosts";
import { useCreatePost } from "../hooks/useCreatePost";

interface PostsProps {
  changeActivePostId: (postId: number) => void;
}

export function Posts({ changeActivePostId }: PostsProps) {
  const { posts, status, error } = usePosts();
  const mutation = useCreatePost();

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

  function onSubmit(values: PostRequest) {
    mutation.mutate(values);
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h2 className="font-bold">Posts</h2>
        {displayPosts()}
      </div>
      <hr className="border-gray-600 my-1" />
      <div>
        <h2 className="font-bold">Add Post</h2>
        <PostForm onSubmit={onSubmit} />
        {mutation.isLoading && <div>Loading...</div>}
      </div>
    </div>
  );
}
