import { Button } from "components/shared/button/Button";
import { Navigation } from "components/navigation/Navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Dropdown } from "components/shared/dropdown/Dropdown";

const Actions = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Button onClick={() => signIn()} className="bg-white">
        Sign in
      </Button>
    );
  }

  console.log(session);

  return (
    <Dropdown
      trigger={
        <Image
          src={session.user?.image as string}
          width={32}
          height={32}
          alt="Avatar"
          className="rounded-full focus:ring-2"
        />
      }
    />
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
