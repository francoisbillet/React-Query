import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Posts } from "./components/Posts";
import { useState } from "react";
import { Post } from "./components/Post";

const queryClient = new QueryClient();

function App() {
  const [activePostId, setActivePostId] = useState<string>("");

  return (
    // Provides the client to the App
    <QueryClientProvider client={queryClient}>
      <div className="p-2">
        <a
          href="#"
          onClick={() => setActivePostId("")}
          className="underline text-blue-500"
        >
          All posts
        </a>
        <hr className="border-gray-600 my-1" />
        <main>
          {activePostId === "" ? (
            <Posts changeActivePostId={setActivePostId} />
          ) : (
            <Post activePostId={activePostId} />
          )}
        </main>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
