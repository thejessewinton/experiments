import { colorOptions } from "client-data/data/color-options";
import { Button } from "components/shared/button/Button";
import { Input } from "components/shared/input/Input";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { type RouterInputs, trpc } from "utils/trpc";

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
            className="group relative flex h-6 w-6 max-w-xs items-center gap-3 rounded-full"
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

  const tags = trpc.tags.getAll.useQuery();
  const utils = trpc.useContext();

  const submit = trpc.tags.addTag.useMutation({
    onSuccess: () => {
      reset();
      utils.tags.invalidate();
      toast.success("Tag added successfully");
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
    <>
      {tags.data?.map((tag) => (
        <div key={tag.id} className="flex items-center gap-3">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: tag.color }}
          />
          <div>{tag.value}</div>
        </div>
      ))}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input type="text" {...register("value")} label="Value" />
        <ColorValues options={filteredColorOptions} {...register("color")} />
        <Button type="submit" disabled={submit.isLoading}>
          {submit.isLoading ? "Loading" : "Submit"}
        </Button>
      </form>
    </>
  );
};
