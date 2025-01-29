import { NavLink } from "react-router-dom";
import { clsx } from "clsx";
interface LinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

export function CustomLink({ to, children, className = "h-full" }: LinkProps) {
  return (
    <>
      <NavLink
        to={to}
        className={({ isActive }) =>
          clsx(className, "flex items-center px-3", {
            "text-yellow-900": isActive,
          })
        }
      >
        {children}
      </NavLink>
    </>
  );
}
