import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./router";
import { Loading } from "./components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import './config/i18next'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router>
        <Suspense fallback={<Loading />}>
          <AppRouter />
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
