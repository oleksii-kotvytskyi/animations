import { TaskLayout } from "@/components/task-layout";
import "./pyramid.css";

export const ThirdDay = ({ id }: { id: string }) => {
  return (
    <TaskLayout day={id}>
      <div className="bg-[#272c34] flex justify-center items-center h-full rounded-xl">
        <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden">
          {/* sky */}
          <div className="absolute bg-[#7DDFFC] h-[124px] w-full top-0 sky" />
          {/* sand, ground */}
          <div className="absolute bg-yellow-200 h-[56px] w-full bottom-0 ground" />
          {/* sun */}
          <div className="sun" />
          {/* moon */}
          {/* <div className="moon"></div> */}

          <div className="pyramid-left"></div>
          <div className="pyramid-right"></div>
          {/* shadow */}
          <div className="shadow"></div>
        </div>
      </div>
    </TaskLayout>
  );
};
