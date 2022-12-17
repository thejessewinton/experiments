import { Button } from "components/button/Button";
import { Navigation } from "components/navigation/Navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

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
    <div className="bg-primary text-primary relative z-40 border-b border-neutral-700 px-3 sm:px-6 lg:px-8">
      <header className="relative mx-auto max-w-7xl">
        <div className="flex items-center justify-between pt-3 pb-2 md:pt-4 md:pb-3">
          <Link href="/" className="text-white">
            Logo
          </Link>
          <Actions />
        </div>
        <Navigation />
      </header>
    </div>
  );
};
