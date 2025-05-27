import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-60 p-6 w-full">{children}</main>
    </div>
  );
};

export default Layout;
