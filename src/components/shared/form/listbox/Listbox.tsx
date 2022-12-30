import { Listbox as ListBox, Transition } from "@headlessui/react";
import { Fragment, type ReactNode } from "react";

type OptionsProps = { label: string; value: string };

interface ListboxProps {
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
      className="text-2xs transition-colors hover:bg-neutral-700"
    >
      {label}
    </ListBox.Option>
  );
};

export const Listbox = ({
  name,
  value,
  label,
  onChange,
  children,
}: ListboxProps) => {
  return (
    <>
      <ListBox value={value} onChange={onChange} name={name}>
        <div className="relative mt-1">
          <ListBox.Button className="relative w-full cursor-default rounded-t bg-neutral-800 py-1.5 pl-2 pr-10 text-left text-2xs shadow-md">
            {label}
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
            <ListBox.Options className="max-h-30 absolute w-full overflow-auto rounded-b bg-neutral-800 py-1.5 pl-2 shadow-lg outline-none">
              {children}
            </ListBox.Options>
          </Transition>
        </div>
      </ListBox>
    </>
  );
};

Listbox.Option = Option;
