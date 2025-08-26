import { Outlet } from "react-router-dom";
import { Header } from "./components/index";
import { Toaster } from 'sonner'



function App() {
  return (
    <div>
      <Header />
      <div className="pt-[70px]">
        <Outlet />
      </div>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default App;
