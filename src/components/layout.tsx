import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  day: string;
};

export const Layout = ({ children, day }: LayoutProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-4xl font-semibold font-base">Day {day}</h3>
      <div className="w-[400px] h-[400px]">{children}</div>
    </div>
  );
};
