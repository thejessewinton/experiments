import { Button } from "components/button/Button";
import { signIn, signOut, useSession } from "next-auth/react";

const Actions = () => {
  const { data: session } = useSession();
  return (
    <Button
      onClick={session ? () => signOut() : () => signIn()}
      className="bg-white"
    >
      {session ? "Sign out" : "Sign in"}
    </Button>
  );
};

export const Header = () => {
  return (
    <div className="bg-primary text-primary relative z-40 px-3 sm:px-6 lg:px-8">
      <header className="relative mx-auto max-w-7xl">
        <div className="flex items-center justify-between pt-3 pb-2 md:pt-4 md:pb-3">
          <h5 className="text-white">Logo</h5>
          <Actions />
        </div>
      </header>
    </div>
  );
};
