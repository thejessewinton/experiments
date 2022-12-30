import { Listbox } from "@headlessui/react";
import type { ReactNode } from "react";

const Option = ({ label, value }: { label: string; value: string }) => {
  return <Listbox.Option value={value}>{label}</Listbox.Option>;
};

interface SelectProps {
  label: string;
  children: ReactNode;
  onChange: (value: string) => void;
}

export const Select = ({ label, children, ...rest }: SelectProps) => {
  return (
    <div className="h-8 flex-initial">
      <div className="flex h-8 items-stretch rounded shadow-sm focus-within:ring-1 focus-within:ring-sky-600/75">
        <label className="sr-only">{label}</label>

        <Listbox {...rest} as="div">
          <Listbox.Button>{label}</Listbox.Button>
          <Listbox.Options>{children}</Listbox.Options>
        </Listbox>
      </div>
    </div>
  );
};

Select.Option = Option;
