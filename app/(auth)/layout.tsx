import type { ReactNode, FC } from "react";

interface Props {
  children?: ReactNode;
}

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <h1>Auth Layout</h1>
      {children}
    </div>
  );
};

export default AuthLayout;
