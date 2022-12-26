import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Dropdown } from "components/shared/dropdown/Dropdown";
import { trpc } from "utils/trpc";

export const Actions = ({ id }: { id: string }) => {
  const utils = trpc.useContext();

  const deleteJob = trpc.jobs.deleteJob.useMutation({
    onMutate: (data) => {
      const previousJobs = utils.jobs.getAll.getData();
      const newJobs = previousJobs?.filter((job) => job.id !== data.job_id);
      utils.jobs.getAll.setData((() => undefined)(), newJobs);
    },
  });

  return (
    <div className="relative">
      <Dropdown
        trigger={
          <div className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:dark:bg-neutral-800">
            <EllipsisHorizontalIcon className="h-4 w-4" />
          </div>
        }
        align="left"
      >
        <Dropdown.Item>
          <button
            onClick={() => deleteJob.mutate({ job_id: id })}
            className="flex w-full items-center gap-2 text-left text-xs"
          >
            Delete Job
          </button>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};
