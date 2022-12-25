import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...rest }: CheckboxProps, ref: React.Ref<HTMLInputElement>) => {
    return (
      <label className="flex items-center space-x-2">
        <input type="checkbox" {...rest} ref={ref} />
        <span>{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
