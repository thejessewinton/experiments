import type { PropsWithChildren } from "react";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="mx-auto flex h-screen w-full flex-col items-center justify-center">
        {children}
      </div>
    </>
  );
};
