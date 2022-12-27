import { Header } from "components/layout/header/Header";
import type { PropsWithChildren } from "react";

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </>
  );
};
