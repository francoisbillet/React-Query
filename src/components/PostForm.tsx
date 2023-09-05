import { SyntheticEvent, useState } from "react";
import { PostRequest } from "../api/posts";

interface PostFormProps {
  onSubmit: (values: PostRequest) => void;
  initialValues?: PostRequest;
}

export function PostForm({
  onSubmit,
  initialValues = { title: "", content: "" },
}: PostFormProps) {
  const [title, setTitle] = useState<string>(initialValues.title);
  const [content, setContent] = useState<string>(initialValues.content);

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    onSubmit({ title, content });
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
