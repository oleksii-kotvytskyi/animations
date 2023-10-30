import { TaskLayout } from "@/components/task-layout";
import "./4-circles.scss";

export const FourthDay = ({ id }: { id: string }) => {
  return (
    <TaskLayout day={id}>
      <div className="bg-[#e56262] flex justify-center items-center h-full rounded-xl">
        <div className="absolute circle circle__big"></div>
        <div className="absolute circle circle__medium"></div>
        <div className="absolute circle circle__small"></div>
      </div>
    </TaskLayout>
  );
};
