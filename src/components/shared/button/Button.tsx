import type { ButtonHTMLAttributes } from "react";

import { clsx } from "clsx";

export const Button = ({
  children,
  type = "button",
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type={type}
      {...rest}
      className={clsx(
        "shadow-xs focus-ring flex h-fit w-fit cursor-pointer items-center justify-center gap-3 rounded bg-neutral-900 py-1.5 px-4 text-sm font-medium text-white shadow-black/25 transition-all disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-neutral-900",
        className
      )}
    >
      {children}
    </button>
  );
};

Button.displayName = "Button";
