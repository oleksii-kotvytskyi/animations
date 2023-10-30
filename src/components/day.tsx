import { Outlet } from "react-router-dom";

export const Day = ({ isPageView }: { isPageView?: boolean }) => {
  return (
    <div className="relative flex items-center justify-center h-screen w-full px-4">
      <Outlet context={{ isPageView }} />
    </div>
  );
};
