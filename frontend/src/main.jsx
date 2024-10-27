import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import toast from "react-hot-toast";
import {
  QueryClient,
  QueryCache,
  MutationCache,
  QueryClientProvider,
} from "@tanstack/react-query";
import GlobalProvider from "./provider/GlobalProvider.jsx";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query?.meta?.DisableGlobalErrorHandling) return;
      toast.error(error.message);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const serverMessage = error.response?.data?.message;
      toast.error(serverMessage || error.message);
    },
  }),
  defaultOptions: {
    queries: { staleTime: 3 * 60 * 1000 },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
