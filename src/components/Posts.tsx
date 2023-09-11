import { PostRequest, Post as TPost } from "../types/posts";
import { PostForm } from "./PostForm";
import { usePosts } from "../hooks/usePosts";
import { useCreatePost } from "../hooks/useCreatePost";

interface PostsProps {
  changeActivePostId: (postId: number) => void;
}

export function Posts({ changeActivePostId }: PostsProps) {
  const getPosts = usePosts();
  const createPost = useCreatePost();

  function displayPosts() {
    if (getPosts.status === "loading") {
      return <span>Loading...</span>;
    }

    if (getPosts.status === "error") {
      return <span>Error : {getPosts.error?.message}</span>;
    }

    return (
      <ul>
        {getPosts.data?.map((post: TPost) => (
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
    createPost.mutate(values);
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="font-bold">Posts </h2>
          {getPosts.isFetching && <small>Updating...</small>}
        </div>
        {displayPosts()}
      </div>
      <hr className="border-gray-600 my-1" />
      <div>
        <h2 className="font-bold">Add Post</h2>
        <PostForm onSubmit={onSubmit} />
        {createPost.status === "loading" && <div>Loading...</div>}
      </div>
    </div>
  );
}
