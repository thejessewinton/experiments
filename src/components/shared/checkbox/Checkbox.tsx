import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...rest }: CheckboxProps, ref: React.Ref<HTMLInputElement>) => {
    return (
      <label className="flex items-center space-x-2 text-2xs font-light">
        <input
          type="checkbox"
          {...rest}
          ref={ref}
          className="focus:ring-1 focus:ring-sky-600/75 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
        />
        <span>{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
