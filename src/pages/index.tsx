import { useMemo } from "react";

import { Routes } from "./1-10days/routes";

export const List = () => {
  const daysToRender = useMemo(() => Routes.map((r) => r.props.element), []);

  return (
    <div className="p-10 flex gap-10">
      {daysToRender.map((component) => component)}
    </div>
  );
};
