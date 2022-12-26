import { colorOptions } from "client-data/data/color-options";
import { Button } from "components/shared/button/Button";
import { Input } from "components/shared/input/Input";
import { Select } from "components/shared/select/Select";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { type RouterInputs, trpc } from "utils/trpc";

type Values = RouterInputs["tags"]["addTag"];

export const NewTagForm = () => {
  const { register, handleSubmit } = useForm<Values>();

  const tags = trpc.tags.getAll.useQuery();
  const utils = trpc.useContext();

  const submit = trpc.tags.addTag.useMutation({
    onSuccess: () => {
      utils.tags.invalidate();
      toast.success("Candidate updated successfully");
    },
  });

  const onSubmit = async (values: Values) => {
    await submit.mutateAsync(values);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">Candidate</h1>
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
        <Select label="Color" {...register("color")}>
          {Object.entries(colorOptions).map(([key, value]) => (
            <Select.Option key={key} value={value} label={key} />
          ))}
        </Select>
        <Button type="submit" disabled={submit.isLoading}>
          {submit.isLoading ? "Loading" : "Submit"}
        </Button>
      </form>
    </div>
  );
};
