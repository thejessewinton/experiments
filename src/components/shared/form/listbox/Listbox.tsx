import { Listbox as ListBox, Transition } from "@headlessui/react";
import { Fragment, useState, type ReactNode } from "react";
import { capitalize } from "utils/capitalize";

type OptionsProps = { label: string; value: string };

interface ListboxProps {
  icon?: ReactNode;
  name: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
  children: ReactNode;
}

const Option = ({ label, value }: OptionsProps) => {
  return (
    <ListBox.Option
      key={label}
      value={value}
      className="rounded py-1 px-2 text-xs text-neutral-400 transition-colors hover:bg-neutral-700"
    >
      {label}
    </ListBox.Option>
  );
};

export const Listbox = ({
  icon,
  name,
  value,
  label,
  onChange,
  children,
}: ListboxProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleChange = (val: string) => {
    onChange(val);
    setSelected(capitalize(val));
  };

  return (
    <>
      <ListBox value={value} onChange={handleChange} name={name}>
        <div className="relative mt-1 max-w-fit">
          <ListBox.Button className="relative flex w-full cursor-default items-center rounded border border-neutral-300 py-1 px-2 text-left text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-400">
            {icon ? <span className="mr-1">{icon}</span> : null}
            {selected || label}
          </ListBox.Button>
          <Transition
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <ListBox.Options className="max-h-30 absolute mt-2 w-full min-w-[125px] cursor-pointer space-y-2 overflow-auto rounded bg-neutral-800 py-1.5 px-2 shadow-lg shadow-black/75 outline-none">
              {children}
            </ListBox.Options>
          </Transition>
        </div>
      </ListBox>
    </>
  );
};

Listbox.Option = Option;
