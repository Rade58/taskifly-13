import clsx from "clsx";
import type { ReactNode, FC } from "react";

interface PropsI {
  children?: ReactNode;
  className?: string;
}

const Card: FC<PropsI> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        "rounded-3xl px-10 py-4 drop-shadow-xl bg-white",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
