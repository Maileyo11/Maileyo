
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./components/index";
import { Toaster } from 'sonner'




function App() {
  const location = useLocation();
  // List of protected routes where Header should not be shown
  const protectedRoutes = ["/chat-dashboard"];
  const hideHeader = protectedRoutes.includes(location.pathname);
  return (
    <div>
      {!hideHeader && <Header />}
      <div className={!hideHeader ? "pt-[70px]" : undefined}>
        <Outlet />
      </div>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default App;
