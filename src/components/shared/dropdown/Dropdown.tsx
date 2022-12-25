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
          "group flex w-full items-center px-6 py-2 text-sm dark:text-white",
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
}: {
  trigger: ReactNode;
  children: ReactNode;
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
        <Menu.Items className="absolute right-0 z-50 mt-2 w-60 origin-top-right divide-y divide-gray-100 rounded border border-neutral-700 bg-white shadow-lg shadow-black/70 focus:outline-none dark:divide-neutral-700 dark:bg-neutral-900">
          <div className="py-1">{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

Dropdown.Item = Item;
