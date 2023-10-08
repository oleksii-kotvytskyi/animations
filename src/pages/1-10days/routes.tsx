import { Route, generatePath } from "react-router-dom";
import { PATHS } from "@/constants/paths";
import { FirstDay } from "./1";
import { SecondDay } from "./2";
import { ThirdDay } from "./3";

export const Routes = [
  <Route
    path={generatePath(PATHS.DAY_TASK, { dayId: "1" })}
    element={<FirstDay id="1" />}
  />,
  <Route
    path={generatePath(PATHS.DAY_TASK, { dayId: "2" })}
    element={<SecondDay id="2" />}
  />,
  <Route
    path={generatePath(PATHS.DAY_TASK, { dayId: "3" })}
    element={<ThirdDay id="3" />}
  />,
  <Route
    path={generatePath(PATHS.DAY_TASK, { dayId: "4" })}
    element={<FirstDay id="4" />}
  />,
];
