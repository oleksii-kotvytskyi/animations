import { Route, generatePath } from "react-router-dom";
import { PATHS } from "@/constants/paths";
import { FirstDay } from "./1";
import { SecondDay } from "./2";

export const Routes = [
  <Route
    path={generatePath(PATHS.DAY_TASK, { dayId: "1" })}
    element={<FirstDay />}
  />,
  <Route
    path={generatePath(PATHS.DAY_TASK, { dayId: "2" })}
    element={<SecondDay />}
  />,
];
