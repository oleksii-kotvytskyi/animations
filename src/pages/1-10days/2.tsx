import { TaskLayout } from "@/components/task-layout";
// import { useState } from "react";

export const SecondDay = ({ id }: { id: string }) => {
  // const [isActive, setIsActive] = useState(false);

  return (
    <TaskLayout day={id}>
      <div className="flex justify-center items-center bg-[#3faf82] h-full rounded-xl">
        {/* base options, TODO scale-150 in the end */}
        <div className="flex flex-col gap-y-[14px]">
          <div className="w-20 h-2 bg-white rounded-[3px] shadow-[0_2px_13px_1px_rgba(0,0,0,0.3)]" />
          <div className="w-20 h-2 bg-white rounded-[3px] shadow-[0_2px_13px_1px_rgba(0,0,0,0.3)]" />
          <div className="w-20 h-2 bg-white rounded-[3px] shadow-[0_2px_13px_1px_rgba(0,0,0,0.3)]" />
        </div>
      </div>
    </TaskLayout>
  );
};
