import { Header } from "components/layout/header/Header";
import type { PropsWithChildren } from "react";

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="w-full px-3 py-4 sm:py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </>
  );
};
