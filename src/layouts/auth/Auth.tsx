import type { PropsWithChildren } from "react";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="mx-auto flex h-screen w-full flex-col items-center justify-center px-3 py-4 sm:py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </>
  );
};
