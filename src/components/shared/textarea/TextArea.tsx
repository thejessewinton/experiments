import React from "react";

import { clsx } from "clsx";

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
  inputClassName?: string;
  value?: string;
  name: string;
  icon?: React.ReactNode;
  error?: string | undefined;
  secondaryLabel?: string;
}

export const TextArea = React.forwardRef(
  (
    { label, name, secondaryLabel, ...rest }: TextAreaProps,
    ref: React.Ref<HTMLTextAreaElement>
  ) => {
    return (
      <div className="relative flex flex-col gap-2">
        {label ? (
          <label htmlFor={name} className="block dark:text-white">
            {label}
          </label>
        ) : null}

        <textarea
          {...rest}
          name={name}
          ref={ref}
          className="h-fit w-full resize-none rounded bg-neutral-800 py-2 px-3 text-sm text-white outline-none transition-all placeholder:text-neutral-500 read-only:cursor-not-allowed focus:ring-1 focus:ring-sky-600/75"
        />
        {secondaryLabel && <p className="block text-xs">{secondaryLabel}</p>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
