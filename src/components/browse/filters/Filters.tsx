import type { RouterInputs } from "utils/trpc";
import { CandidateLevel } from "@prisma/client";
import { Select } from "components/shared/select/Select";
import { capitalize } from "utils/capitalize";
import { useRouter } from "next/router";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

type FilterValues = RouterInputs["browse"]["getCandidates"];

export const Filters = () => {
  const router = useRouter();
  const methods = useFormContext();

  const { register } = useForm<FilterValues>({
    defaultValues: {
      levels: router.query?.levels as CandidateLevel | undefined,
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="mb-4 grid grid-cols-4 gap-6">
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
        <Select
          {...register("languages")}
          label="Languages"
          onChange={(e) =>
            router.push({
              query: {
                ...router.query,
                languages: e.target.value,
              },
            })
          }
        >
          {["javascript", "typescript", "html", "css"].map((language) => {
            return (
              <Select.Option
                key={language}
                value={language.toLowerCase()}
                label={capitalize(language)}
              />
            );
          })}
        </Select>
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
      </div>
    </FormProvider>
  );
};
