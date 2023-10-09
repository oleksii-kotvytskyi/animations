import { PATHS } from "@/constants/paths";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Link, generatePath, useOutletContext } from "react-router-dom";

type TaskLayoutProps = {
  children: ReactNode;
  day: string;
};

export const TaskLayout = ({ children, day }: TaskLayoutProps) => {
  const context = useOutletContext<{ isPageView?: boolean } | undefined>();

  return (
    <Link
      to={{ pathname: generatePath(PATHS.DAY_TASK, { dayId: day }) }}
      className={cn("flex flex-col gap-3 max-w-[400px]")}
      state={`daysId=${day}`}
      style={{ zoom: !context ? 0.5 : 1 }}
    >
      <h3
        style={{ zoom: !context ? 1.5 : 1 }}
        className={cn(
          "absolute text-2xl font-semibold font-base bottom-full left-0",
          context?.isPageView && "top-0 left-4 md:left-10 text-4xl"
        )}
      >
        Day {day}
      </h3>
      <div
        className={cn(
          "w-[400px] h-[400px] rounded-xl",
          context?.isPageView && "animate-loadPage"
        )}
      >
        {children}
      </div>
    </Link>
  );
};
