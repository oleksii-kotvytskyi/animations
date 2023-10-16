import { TaskLayout } from "@/components/task-layout";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

export const SecondDay = ({ id }: { id: string }) => {
  const [isActive, setIsActive] = useState(false);
  const isFirstRender = useRef(false);

  return (
    <TaskLayout day={id}>
      <div className="flex justify-center items-center bg-[#3faf82] h-full rounded-xl">
        <div
          className="flex flex-col gap-y-[14px]"
          onClick={(e) => {
            e.preventDefault();
            if (!isFirstRender.current) {
              isFirstRender.current = true;
            }
            setIsActive((prev) => !prev);
          }}
        >
          <div
            className={cn(
              "w-20 h-2 bg-white rounded-[3px] shadow-[0_2px_13px_1px_rgba(0,0,0,0.3)]",
              isFirstRender.current && !isActive && "animate-burgerTopRev",
              isActive && "animate-burgerTop"
            )}
          />
          <div
            className={cn(
              "w-20 h-2 bg-white rounded-[3px] shadow-[0_2px_13px_1px_rgba(0,0,0,0.3)] transition-all duration-700",
              isFirstRender.current && !isActive && "scale-1 opacity-100",
              isActive && "scale-0 opacity-0"
            )}
          />
          <div
            className={cn(
              "w-20 h-2 bg-white rounded-[3px] shadow-[0_2px_13px_1px_rgba(0,0,0,0.3)]",
              isFirstRender.current && !isActive && "animate-burgerBottomRev",
              isActive && "animate-burgerBottom"
            )}
          />
        </div>
      </div>
    </TaskLayout>
  );
};
