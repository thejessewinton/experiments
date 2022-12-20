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
        "shadow-xs flex h-fit w-fit cursor-pointer items-center justify-center gap-3 rounded-sm bg-white py-1.5 px-4 text-xs font-medium shadow-black/25 transition-all disabled:cursor-not-allowed disabled:opacity-70 dark:text-neutral-900",
        className
      )}
    >
      {children}
    </button>
  );
};

Button.displayName = "Button";
