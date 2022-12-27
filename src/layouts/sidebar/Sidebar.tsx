import { Header } from "components/layout/header/Header";
import { Sidebar } from "components/layout/sidebar/Sidebar";
import type { PropsWithChildren } from "react";

export const SidebarLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:py-6 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          <Sidebar />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
};
