import { PATHS } from "@/constants/paths";
import { ReactNode } from "react";
import { Link, generatePath } from "react-router-dom";

type TaskLayoutProps = {
  children: ReactNode;
  day: string;
};

export const TaskLayout = ({ children, day }: TaskLayoutProps) => {
  return (
    <Link
      to={generatePath(PATHS.DAY_TASK, { dayId: day })}
      className="flex flex-col gap-3"
    >
      <h3 className="text-4xl font-semibold font-base">Day {day}</h3>
      <div className="w-[400px] h-[400px]">{children}</div>
    </Link>
  );
};
