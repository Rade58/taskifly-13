import clsx from "clsx";
import type { ReactNode, FC } from "react";

interface PropsI {
  children?: ReactNode;
  className?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  type?: string;
}
const Input: FC<PropsI> = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full",
        className
      )}
      {...props}
    />
  );
};

export default Input;
