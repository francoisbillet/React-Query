import { useMutation, useQuery } from "react-query";
import { PostRequest, createPost, getPosts } from "../api/posts";
import { Post as TPost } from "../types/posts";
import { SyntheticEvent, useState } from "react";

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

  const mutation = useMutation((newPost: PostRequest) => createPost(newPost));

  function onSubmit(title: string, content: string) {
    mutation.mutate({ title, content });
  }

  return (
    <div className="flex gap-20">
      <div>
        <h2 className="font-bold">Posts</h2>
        {displayPosts()}
      </div>
      <div>
        <h2 className="font-bold">Add Post</h2>
        <CreatePostForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

interface CreatePostFormProps {
  onSubmit: (title: string, content: string) => void;
}

function CreatePostForm({ onSubmit }: CreatePostFormProps) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    onSubmit(title, content);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-1">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border"
        />
      </div>
      <div className="flex gap-1">
        <label htmlFor="content">Content</label>
        <input
          type="text"
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border"
        />
      </div>
      <button type="submit" className="border">
        Submit
      </button>
    </form>
  );
}
