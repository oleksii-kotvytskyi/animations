import { useMemo } from "react";

import { Routes } from "./1-10days/routes";

export const List = () => {
  const daysToRender = useMemo(() => Routes.map((r) => r.props.element), []);

  return (
    <div className="px-4 py-10 md:px-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-10">
      {daysToRender.map((component, i) => (
        <div className="relative" key={`list-${i}`}>
          {component}
        </div>
      ))}
    </div>
  );
};
