import clsx from "clsx";
import type { ForwardRefExoticComponent, InputHTMLAttributes } from "react";
import { forwardRef } from "react";

interface OptionsProps {
  label: string;
  value: string;
}

interface RadioGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  showLabel?: boolean;
  options: OptionsProps[];
}

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  (
    { label, name, options, showLabel = true, ...rest }: RadioGroupProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div className="h-8 flex-initial">
        <div className="flex h-8 items-stretch rounded shadow-sm focus-within:ring-1 focus-within:ring-sky-600/75">
          {options.map((option) => (
            <>
              <input
                className="block h-8 w-full py-0 pr-4 pl-2 text-sm shadow-sm focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                key={option.label}
                name={name}
                ref={ref}
                {...rest}
              />
              <label
                className={clsx(
                  "mb-0 h-8 select-none items-center space-x-1 whitespace-nowrap rounded-l rounded-r-none border-y border-l px-4 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white",
                  showLabel ? "flex" : "hidden"
                )}
              >
                <span>{label}</span>
              </label>
            </>
          ))}
        </div>
      </div>
    );
  }
) as ForwardRefExoticComponent<RadioGroupProps>;

RadioGroup.displayName = "Select";
