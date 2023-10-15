import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { Routes } from "@/pages/routes";
import { List } from "./pages/list";
import { Day } from "@/components/day";
import { Layout } from "@/components/layout";

const container = document.getElementById("root") as HTMLElement;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<List />} />
      <Route path="days" element={<List />} />
      <Route path={""} element={<Day isPageView />}>
        {...Routes}
      </Route>
    </Route>
  ),
  // should be the same name as repo name
  { basename: "/animations-project" }
);

export const RootApplication = () => {
  return <RouterProvider router={router} />;
};

const root = createRoot(container);

root.render(<RootApplication />);
