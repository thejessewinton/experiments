import { Header } from "components/layout/header/Header";
import { Sidebar } from "components/layout/sidebar/Sidebar";
import type { PropsWithChildren } from "react";

export const SidebarLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="w-full px-3 py-4 sm:py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-24">
            <Sidebar />
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
};
