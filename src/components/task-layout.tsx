import { PATHS } from "@/constants/paths";
import { cn } from "@/lib/utils";
import { CSSProperties, ReactNode } from "react";
import { Link, generatePath, useOutletContext } from "react-router-dom";

type TaskLayoutProps = {
  children: ReactNode;
  day: string;
  style?: CSSProperties;
  disabled?: boolean;
};

export const TaskLayout = ({
  children,
  day,
  style,
  disabled,
}: TaskLayoutProps) => {
  const context = useOutletContext<{ isPageView?: boolean } | undefined>();

  return (
    <Link
      to={{ pathname: generatePath(PATHS.DAY_TASK, { dayId: day }) }}
      // scale need for show the same card on different pages with no visual changes, just scale it
      // depends on context
      className={cn(
        "flex flex-col max-w-full cursor-default",
        !context && "sm:scale-50 origin-top-left cursor-pointer"
      )}
      state={`daysId=${day}`}
    >
      {/* show day on different screens */}
      <h3
        className={cn(
          "absolute text-2xl font-semibold font-base sm:left-4 z-10",
          context?.isPageView && "top-0 left-4 md:left-10 text-4xl",
          !context && "top-[-40px] sm:scale-150"
        )}
      >
        Day {day}
      </h3>

      <div
        style={style}
        className={cn(
          "w-[400px] h-[400px] rounded-xl max-sm:max-w-full",
          context?.isPageView && "animate-loadPage",
          disabled && "pointer-events-none"
        )}
      >
        {children}
      </div>
    </Link>
  );
};
