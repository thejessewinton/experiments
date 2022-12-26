import { Header } from "components/layout/header/Header";
import type { PropsWithChildren } from "react";

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </>
  );
};
