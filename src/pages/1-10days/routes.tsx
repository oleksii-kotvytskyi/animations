import { Route, generatePath } from "react-router-dom";
import { PATHS } from "@/constants/paths";
import {
  FirstDay,
  SecondDay,
  ThirdDay,
  FourthDay,
  FifthDay,
  SixthDay,
} from "./index";

// TODO, when tasks will be finished
const arr = [7, 8, 9, 10];

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
    element={<FourthDay id="4" />}
  />,
  <Route
    path={generatePath(PATHS.DAY_TASK, { dayId: "5" })}
    element={<FifthDay id="5" />}
  />,
  <Route
    path={generatePath(PATHS.DAY_TASK, { dayId: "6" })}
    element={<SixthDay id="6" />}
  />,
  ...arr.map((el) => (
    <Route
      path={generatePath(PATHS.DAY_TASK, { dayId: String(el) })}
      element={<FirstDay key={el} id={String(el)} />}
    />
  )),
];
