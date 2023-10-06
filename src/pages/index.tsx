import { createElement, useMemo } from "react";
import { FirstDay, SecondDay } from "./1-10days";

export const App = () => {
  const daysToRender = useMemo(() => [FirstDay, SecondDay], []);

  return (
    <div className="p-10 flex gap-10">
      {daysToRender.map((component, index) =>
        createElement(component, { key: `Day ${index}` })
      )}
    </div>
  );
};
