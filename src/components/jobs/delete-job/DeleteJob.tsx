import { api } from "utils/api";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const DeleteJob = ({ id }: { id: string }) => {
  const utils = api.useContext();

  const deleteJob = api.jobs.deleteJob.useMutation({
    onMutate: (data) => {
      const previousJobs = utils.jobs.getAll.getData();
      const newJobs = previousJobs?.filter((job) => job.id !== data.job_id);

      utils.jobs.getAll.setData((() => undefined)(), newJobs);
    },
  });

  return (
    <button
      onClick={() => deleteJob.mutateAsync({ job_id: id })}
      className="flex h-6 w-6 items-center justify-center rounded transition-colors hover:dark:bg-neutral-800"
    >
      <XMarkIcon className="h-4 w-4" />
    </button>
  );
};
