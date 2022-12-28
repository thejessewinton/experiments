import clsx from "clsx";
import type { ForwardRefExoticComponent, InputHTMLAttributes } from "react";
import { forwardRef, type ReactNode } from "react";

const Option = ({ label, value }: { label: string; value: string }) => {
  return <option value={value}>{label}</option>;
};

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  showLabel?: boolean;
  children: ReactNode;
}

interface SelectComponent extends ForwardRefExoticComponent<SelectProps> {
  Option: typeof Option;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, children, showLabel = true, ...rest }: SelectProps,
    ref: React.Ref<HTMLSelectElement>
  ) => {
    return (
      <div className="h-8 flex-initial">
        <div className="flex h-8 items-stretch rounded shadow-sm focus-within:ring-1 focus-within:ring-sky-600/75">
          {showLabel ? (
            <label className="mb-0 flex h-8 select-none items-center space-x-1 whitespace-nowrap rounded-l rounded-r-none border-y border-l px-4 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white">
              <span>{label}</span>
            </label>
          ) : null}
          <select
            className={clsx(
              "block h-8 w-full py-0 pr-4 pl-2 text-sm shadow-sm focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white",
              !showLabel
                ? "rounded"
                : "rounded-l-none rounded-r border-y border-r"
            )}
            ref={ref}
            {...rest}
          >
            {children}
          </select>
        </div>
      </div>
    );
  }
) as SelectComponent;

Select.displayName = "Select";
Select.Option = Option;
