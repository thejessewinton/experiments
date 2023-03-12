import { XMarkIcon } from "@heroicons/react/24/outline";
import { colorOptions } from "client-data/data/color-options";
import { Button } from "components/shared/button/Button";
import { Input } from "components/shared/input/Input";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { makePlural } from "utils/make-plural";
import { type RouterInputs, api } from "utils/api";

type Values = RouterInputs["tags"]["addTag"];

interface ColorValuesProps {
  name: string;
  options: typeof colorOptions;
}

const ColorValues = forwardRef<HTMLInputElement, ColorValuesProps>(
  ({ name, options, ...rest }, ref: React.Ref<HTMLInputElement>) => {
    return (
      <div className="flex gap-3">
        {Object.entries(options).map(([key, value]) => (
          <div
            key={key}
            className="group relative flex h-4 w-4 max-w-xs items-center gap-3 rounded-full"
          >
            <input
              type="radio"
              name={name}
              value={value}
              ref={ref}
              {...rest}
              style={{ backgroundColor: value }}
              className="absolute inset-0 cursor-pointer appearance-none rounded-full checked:ring-1 checked:ring-sky-600/75"
            />
          </div>
        ))}
      </div>
    );
  }
);

ColorValues.displayName = "ColorValues";

export const NewTagForm = () => {
  const { register, handleSubmit, reset } = useForm<Values>({
    defaultValues: {
      value: undefined,
      color: "",
    },
  });

  const tags = api.tags.getAll.useQuery();
  const utils = api.useContext();

  const submit = api.tags.addTag.useMutation({
    onSuccess: () => {
      reset();
      utils.tags.invalidate();
    },
  });

  const remove = api.tags.deleteTag.useMutation({
    onMutate: (data) => {
      const previousTags = utils.tags.getAll.getData();
      utils.tags.getAll.setData((() => undefined)(), () =>
        previousTags?.filter((tag) => tag.id !== data.tag_id)
      );
    },
    onSuccess: () => {
      utils.tags.getAll.invalidate();
      toast.success("Tag deleted successfully");
    },
  });

  const onSubmit = async (values: Values) => {
    await submit.mutateAsync(values);
  };

  const filteredColorOptions = Object.entries(colorOptions).reduce(
    (acc, [key, value]) => {
      if (tags.data?.find((tag) => tag.color === value)) return acc;
      return { ...acc, [key]: value };
    },
    {} as typeof colorOptions
  );

  return (
    <div>
      <div className="space-y-2">
        {tags.data?.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center justify-between gap-3 rounded bg-neutral-800 p-2"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: tag.color }}
              />
              <div>{tag.value}</div>

              {tag._count.job > 0 ? (
                <span>
                  {tag._count.job} {makePlural("Job", tag._count.job)}
                </span>
              ) : null}
            </div>
            <button onClick={() => remove.mutateAsync({ tag_id: tag.id })}>
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-3"
      >
        <div className="flex items-center gap-2">
          <ColorValues options={filteredColorOptions} {...register("color")} />
          <Input type="text" {...register("value")} label="Value" required />
        </div>
        <Button type="submit" disabled={submit.isLoading}>
          {submit.isLoading ? "Loading" : "Submit"}
        </Button>
      </form>
    </div>
  );
};
