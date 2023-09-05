import { useState } from "react";

export const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  function submitForm() {}

  return (
    <form onSubmit={submitForm} method="post" className="flex flex-col gap-1">
      <div className="flex gap-2">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border"
        />
      </div>
      <div className="flex gap-2">
        <label>Content</label>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border"
        />
      </div>
      <button type="submit" className="border bg-teal-400 p-1 self-start">
        Submit
      </button>
    </form>
  );
};
