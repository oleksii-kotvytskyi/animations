import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { TenDays } from "@/pages/routes";
import { App } from "./pages";
import { Day } from "./components/day";

const container = document.getElementById("root") as HTMLElement;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<App />} />
      <Route path="days" element={<App />} />
      <Route path="" element={<Day />}>
        {...TenDays}
      </Route>
    </Route>
  )
);

export const RootApplication = () => {
  return <RouterProvider router={router} />;
};

const root = createRoot(container);

root.render(<RootApplication />);
