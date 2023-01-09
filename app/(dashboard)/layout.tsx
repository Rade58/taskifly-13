import type { ReactNode, FC } from "react";

interface Props {
  children?: ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <h1>Dashboard Layout</h1>
      {children}
    </div>
  );
};

export default DashboardLayout;
