import type { FC, ReactNode } from "react";
import { clsx } from "clsx";

interface Props {
  children?: ReactNode;
  className: string;
}

const GlassPane: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "glass rounded-2xl border-solid border-2 border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassPane;
