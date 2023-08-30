import { QueryClient, QueryClientProvider } from "react-query";
import { Posts } from "./components/Posts";

const queryClient = new QueryClient();

function App() {
  return (
    // Provides the client to the App
    <QueryClientProvider client={queryClient}>
      <Posts />
    </QueryClientProvider>
  );
}

export default App;
