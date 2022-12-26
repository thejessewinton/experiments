import { Menu, Transition } from "@headlessui/react";

import { Fragment, type ReactNode } from "react";
import { clsx } from "clsx";

const Item = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Menu.Item>
      <div
        className={clsx(
          "group flex w-full items-center px-4 py-3 text-sm dark:text-white hover:dark:bg-neutral-800",
          className
        )}
      >
        {children}
      </div>
    </Menu.Item>
  );
};

export const Dropdown = ({
  trigger,
  children,
  align = "right",
}: {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>{trigger}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={clsx(
            "absolute right-0 !z-50 mt-2 w-60 origin-top-right rounded border border-gray-100 bg-white shadow-lg shadow-black/20 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          <div className="divide-y divide-gray-100 dark:divide-neutral-800">
            {children}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

Dropdown.Item = Item;
