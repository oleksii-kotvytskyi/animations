import { useMemo } from "react";

import { Routes } from "./1-10days/routes";

export const List = () => {
  const daysToRender = useMemo(() => Routes.map((r) => r.props.element), []);

  return (
    <div className="p-10 grid grid-cols-5 gap-y-10">
      {daysToRender.map((component, i) => (
        <div className="relative" key={`list-${i}`}>
          {component}
        </div>
      ))}
    </div>
  );
};
