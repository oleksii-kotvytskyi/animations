import { TaskLayout } from "@/components/task-layout";
import "./6.scss";
import { useState } from "react";

export const SixthDay = ({ id }: { id: string }) => {
  const [count, setCount] = useState(true);

  return (
    <TaskLayout day={id}>
      <button
        onClick={() => {
          setCount(!count);
        }}
      >
        {count ? "true" : "false"}
      </button>
      <div className="bg-gradient-to-tr from-[#eebd6c] to-[#cb7c4f] flex justify-center items-center h-full rounded-xl p-10">
        {/* main info */}
        <div className="w-[60%] bg-white h-full rounded-s-sm flex flex-col items-center gap-5">
          <div>
            {/* avatar */}
            <div className="avatar relative mt-5 w-[70px] h-[70px] bg-red-500 rounded-full ">
              <div className="circle_6 circle_6_first" />
              <div className="circle_6 circle_6_second" />
              <img
                className="rounded-full"
                src="https://100dayscss.com/codepen/jessica-potter.jpg"
              />
            </div>
            <p>Jessica Potter</p>
            <p>Visual artist</p>
          </div>

          {/* person info */}
        </div>
        {/* links */}
        <div className="w-[40%] bg-white h-full rounded-e-sm"></div>
      </div>
    </TaskLayout>
  );
};
