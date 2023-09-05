import { useMutation, useQuery, useQueryClient } from "react-query";
import { PostRequest, createPost, getPosts } from "../api/posts";
import { Post as TPost } from "../types/posts";
import { PostForm } from "./PostForm";

interface PostsProps {
  changeActivePostId: (postId: number) => void;
}

export function Posts({ changeActivePostId }: PostsProps) {
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<Array<TPost>, Error>("posts", getPosts);

  const mutation = useMutation((newPost: PostRequest) => createPost(newPost), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

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
              onClick={() => changeActivePostId(post.id)}
              className="underline"
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
