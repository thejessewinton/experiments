import { PlusIcon } from "@heroicons/react/24/solid";
import { useJobStore } from "client-data/state/use-job-store";
import { Dropdown } from "components/shared/dropdown/Dropdown";
import { api } from "utils/api";

export const SetActiveJob = () => {
  const jobs = api.jobs.getAll.useQuery();
  const { activeJob, setActiveJob } = useJobStore();

  return (
    <div className="mr-0 mb-6 ml-auto flex items-center gap-2">
      <span className="font-light text-neutral-500">Adding to: </span>
      <Dropdown
        trigger={
          <div className="flex h-8 items-center justify-center gap-2 rounded px-2 transition-colors hover:dark:bg-neutral-800">
            <span className="text-neutral-400">
              {activeJob?.title || "Set active job"}
            </span>
            <PlusIcon className="h-4 w-4" />
          </div>
        }
        triggerClassName="rounded"
        className="!w-48"
        align="right"
      >
        {jobs.data?.map((job) => (
          <Dropdown.Item key={job.id}>
            <button
              onClick={() => setActiveJob({ id: job.id, title: job.title })}
              className="flex w-full items-center gap-2 text-left text-xs disabled:cursor-not-allowed"
              disabled={activeJob?.id === job.id}
            >
              {job.title}
            </button>
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
};
