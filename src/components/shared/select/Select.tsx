interface SelectProps {
  label?: string;
}

export const Select = ({ label }: SelectProps) => {
  return (
    <div className="h-4 flex-initial">
      <div className="border-secondary text-primary flex h-4 items-stretch rounded border shadow-sm focus-within:ring">
        <label className="border-secondary bg-secondary mb-0 block h-4 select-none items-center space-x-1 whitespace-nowrap rounded-l rounded-r-none border-r px-1.5 font-medium">
          <span>{label}</span>
        </label>
        <select
          aria-label="Branches"
          className="border-secondary bg-primary block h-4 w-full border border-t-0 border-l-0 border-b-0 border-r-0 py-0 pr-4 pl-2 shadow-sm focus:outline-none"
        >
          <option value="development">development</option>
          <option value="main">main</option>
        </select>
      </div>
    </div>
  );
};
