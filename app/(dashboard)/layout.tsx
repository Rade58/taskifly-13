import type { ReactNode, FC } from "react";
import { Inter } from "@next/font/google";
import "@/styles/global.css";
import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

interface Props {
  children?: ReactNode;
}

const DashboardRootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body className="h-screen w-screen candy-mesh p-6">
        <GlassPane className="w-full h-full flex items-center justify-center">
          <Sidebar />
          {children}
        </GlassPane>
        <div id="modal"></div>
      </body>
    </html>
  );
};

export default DashboardRootLayout;
