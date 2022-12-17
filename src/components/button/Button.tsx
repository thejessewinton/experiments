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
        "shadow-xs flex h-fit w-fit cursor-pointer items-center justify-center gap-3 rounded bg-white py-1 px-4 text-xs font-bold shadow-black/25 transition-all disabled:cursor-not-allowed disabled:opacity-70",
        className
      )}
    >
      {children}
    </button>
  );
};

Button.displayName = "Button";
