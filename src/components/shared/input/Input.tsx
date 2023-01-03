import { forwardRef } from "react";

import { clsx } from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showLabel?: boolean;
  label: string;
  secondaryLabel?: string;
}

export const Input = forwardRef(
  (
    {
      name,
      className,
      showLabel = true,
      label,
      onChange,
      secondaryLabel,
      ...rest
    }: InputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div className={clsx("relative flex flex-col gap-2", className)}>
        <label htmlFor={name} className={showLabel ? "flex" : "sr-only"}>
          {label}
        </label>

        <input
          ref={ref}
          name={name}
          onChange={onChange}
          className="h-fit w-full rounded bg-neutral-100 py-1.5 px-3 text-sm text-white outline-none transition-all placeholder:text-neutral-500 read-only:cursor-not-allowed focus:ring-1 focus:ring-sky-600/75 dark:bg-neutral-800"
          {...rest}
        />
        {secondaryLabel && <p className="block text-xs">{secondaryLabel}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
