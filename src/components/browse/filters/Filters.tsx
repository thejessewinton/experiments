import type { RouterInputs } from "utils/api";
import { CandidateLevel } from "@prisma/client";
import { Select } from "components/shared/select/Select";
import { capitalize } from "utils/capitalize";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Dropdown } from "components/shared/dropdown/Dropdown";
import { Button } from "components/shared/button/Button";
import { Checkbox } from "components/shared/checkbox/Checkbox";

type FilterValues = RouterInputs["browse"]["getCandidates"];

const languageValues = ["javascript", "typescript", "html", "css"];

export const Filters = () => {
  const router = useRouter();

  const { register } = useForm<FilterValues>({
    defaultValues: {
      levels: router.query?.levels as CandidateLevel | undefined,
    },
  });

  return (
    <div className="mb-4">
      <form className="flex gap-6">
        <Select
          {...register("frameworks")}
          label="Frameworks"
          onChange={(e) =>
            router.push({
              query: {
                ...router.query,
                frameworks: e.target.value,
              },
            })
          }
        >
          {["nextjs", "remix", "solid", "svelte"].map((language) => {
            return (
              <Select.Option
                key={language}
                value={language.toLowerCase()}
                label={capitalize(language)}
              />
            );
          })}
        </Select>
        <Dropdown
          trigger={
            <div className="focus-ring flex h-fit w-fit cursor-pointer items-center justify-center gap-3 rounded bg-neutral-900 py-1.5 px-4 text-sm font-medium text-white shadow-sm shadow-black/25 transition-all disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-neutral-900">
              Languages
            </div>
          }
        >
          {languageValues.map((value) => {
            return (
              <Checkbox label={value} key={value} {...register("languages")} />
            );
          })}
        </Dropdown>
        <Select
          {...register("levels")}
          label="Levels"
          onChange={(e) =>
            router.push({
              query: {
                ...router.query,
                levels: e.target.value,
              },
            })
          }
        >
          {Object.entries(CandidateLevel).map(([key, level]) => {
            return (
              <Select.Option
                key={key}
                value={level.toLowerCase()}
                label={capitalize(level)}
              />
            );
          })}
        </Select>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
