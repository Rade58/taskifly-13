import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const IndexLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default IndexLayout;
