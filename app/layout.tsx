import type { FC, ReactNode } from "react";
import GlassPane from "@/components/GlassPane";

interface Props {
  children?: ReactNode;
}

const IndexLayout: FC<Props> = ({ children }) => {
  return <GlassPane className="one">{children}</GlassPane>;
};

export default IndexLayout;
