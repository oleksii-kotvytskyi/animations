import { TaskLayout } from "@/components/task-layout";
import "./6.scss";

export const SixthDay = ({ id }: { id: string }) => {
  return (
    <TaskLayout day={id}>
      <div className="bg-gradient-to-tr from-[#eebd6c] to-[#cb7c4f] flex justify-center items-center h-full rounded-xl p-10">
        {/* main info */}
        <div className="w-[60%] bg-white h-full rounded-s-sm flex flex-col items-center gap-5">
          {/* avatar */}
          <div className="avatar relative mt-7 w-[70px] h-[70px] rounded-full ">
            <div className="circle_6 circle_6_first" />
            <div className="circle_6 circle_6_second" />
            <img
              className="rounded-full"
              src="https://100dayscss.com/codepen/jessica-potter.jpg"
            />
          </div>
          {/* personal */}
          <div className="mt-3 text-center">
            <p className="text-amber-900 font-bold ">Jessica Potter</p>
            <p className="text-amber-900 font-extralight">Visual artist</p>{" "}
          </div>

          {/* actions */}
          <div className="mt-auto mb-4 w-[calc(100%-60px)] flex flex-col gap-3">
            <button className="border border-amber-900 rounded-3xl text-amber-900 font-semibold text-sm py-1 hover:bg-amber-900 hover:text-white ease-in duration-200">
              Follow
            </button>
            <button className="border border-amber-900 rounded-3xl text-amber-900 font-semibold text-sm py-1 hover:bg-amber-900 hover:text-white ease-in duration-200">
              Message
            </button>
          </div>
        </div>
        {/* links */}
        <div className="w-[40%] flex flex-col justify-between bg-white h-full rounded-e-sm">
          <button className="duration-200 text-amber-900 h-full w-full grid place-content-center bg-amber-900 bg-opacity-[20%]  hover:bg-amber-900 hover:bg-opacity-[40%] rounded-tr-sm border-b-white border-b-2">
            <p className="text-lg font-semibold">523</p>
            <p className="font-extralight">Posts</p>
          </button>
          <button className="duration-200 text-amber-900 h-full w-full grid place-content-center bg-amber-900 bg-opacity-[20%]  hover:bg-amber-900 hover:bg-opacity-[40%] rounded-tr-sm border-b-white border-b-2">
            <p className="text-lg font-semibold">1387</p>
            <p className="font-extralight">Likes</p>
          </button>
          <button className="duration-200 text-amber-900 h-full w-full grid place-content-center bg-amber-900 bg-opacity-[20%]  hover:bg-amber-900 hover:bg-opacity-[40%] rounded-tr-sm border-b-white">
            <p className="text-lg font-semibold">146</p>
            <p className="font-extralight">Follower</p>
          </button>
        </div>
      </div>
    </TaskLayout>
  );
};
