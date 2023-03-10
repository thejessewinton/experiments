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
        trigger={
          <Image
            src={(session.user?.image as string) || "/avatar.svg"}
            width={32}
            height={32}
            alt="Avatar"
            className="rounded-full"
          />
        }
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
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-0.0981445 16C-0.0981438 7.16344 7.0653 -7.52254e-07 15.9019 0C22.399 5.67998e-07 27.9917 3.87258 30.4975 9.43544L9.3373 30.5956C8.42926 30.1866 7.56625 29.6953 6.75778 29.1313L19.8891 16H15.9019L4.58815 27.3137C1.69272 24.4183 -0.0981449 20.4183 -0.0981445 16Z"
                    fill="#fff"
                  />
                  <path
                    d="M31.9019 16.0055L15.9074 32C24.7396 31.997 31.8989 24.8377 31.9019 16.0055Z"
                    fill="#fff"
                  />
                </svg>
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
