import { Navigation } from "components/layout/navigation/Navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Dropdown } from "components/shared/dropdown/Dropdown";

const Actions = () => {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <div>
      <Dropdown
        trigger={<div className="h-8 w-8 rounded-full bg-black" />}
        triggerClassName="rounded-full"
        className="!w-60"
      >
        <Dropdown.Item>
          <Link href="/settings">Settings</Link>
        </Dropdown.Item>
        <Dropdown.Item className="border-t border-neutral-600 py-2">
          <button onClick={() => signOut()}>Sign Out</button>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="z-40 border-b border-neutral-800 px-3 text-neutral-900 dark:text-white sm:px-6 lg:px-8">
      <header className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between pt-3 pb-2 md:pt-4 md:pb-3">
          <div className="mr-1 flex shrink-0 items-center">
            <div className="flex items-center pt-3 pb-2 md:pt-4 md:pb-3">
              <Link
                className="text-primary rounded"
                aria-label="Go to dashboard"
                href="/"
              >
                Optimistic UI Experiments
              </Link>
            </div>
          </div>
          <Actions />
        </div>
        <Navigation />
      </header>
    </div>
  );
};
