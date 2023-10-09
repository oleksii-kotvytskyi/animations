import { useMemo } from "react";

import { Routes } from "./1-10days/routes";

export const List = () => {
  const daysToRender = useMemo(() => Routes.map((r) => r.props.element), []);

  return (
    <div className="px-4 py-10 md:px-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-16 sm:gap-y-10">
      {daysToRender.map((component, i) => (
        // change positioning for list elements depends on screen size
        <div
          className="relative sm:max-lg:nth-[n+4]:mt-[-160px] lg:max-xl:nth-[n+5]:mt-[-160px] xl:nth-[n+6]:mt-[-160px]"
          key={`list-${i}`}
        >
          {component}
        </div>
      ))}
    </div>
  );
};
