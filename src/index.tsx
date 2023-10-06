import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { App } from "./pages";

const container = document.getElementById("root") as HTMLElement;

export const RootApplication = () => {
  return (
    <App />
    // <BrowserRouter>
    //  </BrowserRouter>
  );
};

const root = createRoot(container);

root.render(<RootApplication />);
