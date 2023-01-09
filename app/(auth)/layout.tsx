import type { ReactNode, FC } from "react";
import { Inter } from "@next/font/google";
import "@/styles/global.css";
import GlassPane from "@/components/GlassPane";

const inter = Inter({ variable: "--font-inter" });

interface Props {
  children?: ReactNode;
}

const AuthRootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body className="h-screen w-screen rainbow-mesh p-6"></body>

      <GlassPane className="w-full h-full flex items-center justify-center">
        {children}
      </GlassPane>
    </html>
  );
};

export default AuthRootLayout;
