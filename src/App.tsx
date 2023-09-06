import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Posts } from "./components/Posts";
import { useState } from "react";
import { Post } from "./components/Post";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  const [activePostId, setActivePostId] = useState<number | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-2">
        <div className="flex gap-2">
          <a
            href="#"
            onClick={() => setActivePostId(null)}
            className="underline text-blue-500"
          >
            All posts
          </a>
        </div>

        <hr className="border-gray-600 my-1" />
        <main>
          {!activePostId ? (
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
