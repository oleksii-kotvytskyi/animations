import { PATHS } from "@/constants/paths";
import { ReactNode, useEffect, useMemo } from "react";
import { Routes } from "@/pages/routes";
import {
  LinkProps,
  NavLink,
  generatePath,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { cn } from "@/lib/utils";

type NavItemProps = {
  text: string;
  to: LinkProps["to"];
  className?: string;
  disabled?: boolean;
};

const NavItem = ({ to, text, className, disabled }: NavItemProps) => {
  const hoverClass = `
    after:translate-x-[-100%] after:hover:translate-x-0 after:transition-all after:duration-500
    after:opacity-[0] after:hover:opacity-[1]`;

  const baseClass = `
    relative text-lg 
    after:absolute after:h-[2px] after:w-full after:bg-green-400 after:bottom-[-4px] after:left-0`;

  const mainClass = hoverClass + baseClass;

  const activeClass = `after:translate-x-[0] after:opacity-[1]`;

  return (
    <li className={className}>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? cn(mainClass, activeClass, "font-medium")
            : cn(
                mainClass,
                "font-normal",
                disabled && "pointer-events-none opacity-40"
              )
        }
        to={to}
      >
        {text}
      </NavLink>
    </li>
  );
};

export const Header = () => {
  const latestDay = Routes.length;
  const { pathname: path } = useLocation();
  const navigate = useNavigate();
  const dayId = path.length > 5 ? path.split("/days/")?.[1] : null;

  let nextNav: null | ReactNode = null;
  let prevNav: null | ReactNode = null;

  const prevDay = useMemo(() => String(Number(dayId) - 1), [dayId]);
  const nextDay = useMemo(() => String(Number(dayId) + 1), [dayId]);

  const prevPath = generatePath(PATHS.DAY_TASK, { dayId: prevDay });
  const nextPath = generatePath(PATHS.DAY_TASK, { dayId: nextDay });

  // TODO, add tooltips to nextNav/prevNav components
  useEffect(() => {
    const keyDownListener = (event: KeyboardEvent) => {
      if (event.code === "ArrowRight" && Number(dayId) < latestDay)
        navigate(nextPath);
      if (event.code === "ArrowLeft" && Number(dayId) > 1) navigate(prevPath);
    };

    if (dayId) window.addEventListener("keydown", keyDownListener);

    return () => {
      if (dayId) window.removeEventListener("keydown", keyDownListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayId]);

  if (dayId) {
    prevNav = (
      <NavItem to={prevPath} text={"Prev"} disabled={Number(dayId) === 1} />
    );

    nextNav = (
      <NavItem
        to={nextPath}
        text={"Next"}
        disabled={Number(dayId) === latestDay}
      />
    );
  }

  return (
    <header className="px-10 py-4">
      <nav>
        <ul className="flex gap-4">
          <NavItem
            className="mr-5"
            to={generatePath(PATHS.BASE_URL)}
            text="Home"
          />

          <NavItem
            to={generatePath(PATHS.DAY_TASK, {
              dayId: `${latestDay}`,
            })}
            text="Latest day"
          />
          {prevNav}
          {nextNav}
        </ul>
      </nav>
    </header>
  );
};
