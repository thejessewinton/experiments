import { type ReactNode } from "react";

const Option = ({ label, value }: { label: string; value: string }) => {
  return <option value={value}>{label}</option>;
};

export const Select = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return (
    <div className="h-8 flex-initial">
      <div className="flex h-8 items-stretch rounded-sm shadow-sm focus-within:ring-1 focus-within:ring-sky-600/75">
        <label className="mb-0 flex h-8 select-none items-center space-x-1 whitespace-nowrap rounded-l rounded-r-none border-y border-l px-4 text-sm dark:border-neutral-700 dark:text-white">
          <span>{label}</span>
        </label>
        <select className="block h-8 w-full rounded-r rounded-l-none border-y border-r py-0 pr-4 pl-2 text-sm shadow-sm focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
          {children}
        </select>
      </div>
    </div>
  );
};

Select.Option = Option;
