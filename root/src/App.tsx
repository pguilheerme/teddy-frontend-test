import { QueryProvider } from "./lib/queryClient";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <QueryProvider>
      <AppRoutes />
    </QueryProvider>
  );
}

export default App;
