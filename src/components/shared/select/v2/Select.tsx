import clsx from "clsx";
import type { ForwardRefExoticComponent, InputHTMLAttributes } from "react";
import { forwardRef, type ReactNode } from "react";
import { Listbox } from "@headlessui/react";

const Option = ({ label, value }: { label: string; value: string }) => {
  return <option value={value}>{label}</option>;
};

interface SelectProps {
  label: string;
  children: ReactNode;
  value: string;
  onChange: (value: string) => void;
}

interface SelectComponent extends ForwardRefExoticComponent<SelectProps> {
  Option: typeof Option;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ label, value, children, ...rest }: SelectProps, ref: React.Ref<any>) => {
    return (
      <div className="h-8 flex-initial">
        <div className="flex h-8 items-stretch rounded shadow-sm focus-within:ring-1 focus-within:ring-sky-600/75">
          <label className="hidden">{label}</label>

          <Listbox {...rest} refName="">
            <Listbox.Button>{value ? value : label}</Listbox.Button>
            <Listbox.Options>{children}</Listbox.Options>
          </Listbox>
        </div>
      </div>
    );
  }
) as SelectComponent;

Select.displayName = "Select";
Select.Option = Option;
