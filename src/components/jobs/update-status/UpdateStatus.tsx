import { JobStatus } from "@prisma/client";
import { Dropdown } from "components/shared/dropdown/Dropdown";
import { capitalize } from "utils/capitalize";
import { api } from "utils/api";
import { StatusIndicator } from "../status-indicator/StatusIndicator";

export const UpdateStatus = ({
  id,
  status,
}: {
  id: string;
  status: JobStatus;
}) => {
  const utils = api.useContext();

  const jobStatus = api.jobs.updateStatus.useMutation({
    onMutate: (data) => {
      const previousJobs = utils.jobs.getAll.getData();
      const newJobs = previousJobs?.map((job) => {
        if (job.id === data.job_id) {
          return { ...job, status: data.status as JobStatus };
        }
        return job;
      });

      utils.jobs.getAll.setData((() => undefined)(), newJobs);
    },
    onSuccess: () => {
      utils.jobs.getAll.invalidate();
    },
  });

  return (
    <div className="relative">
      <Dropdown
        triggerClassName="rounded"
        trigger={<StatusIndicator status={status} />}
        align="left"
      >
        {Object.entries(JobStatus).map(([key, value]) => {
          return (
            <Dropdown.Item
              key={key}
              className={value === status ? "bg-neutral-800" : ""}
            >
              <button
                onClick={() => jobStatus.mutate({ job_id: id, status: value })}
                className="flex w-full items-center gap-2 text-left text-xs"
              >
                <span>
                  <StatusIndicator status={value} />
                </span>
                {capitalize(value)}
              </button>
            </Dropdown.Item>
          );
        })}
      </Dropdown>
    </div>
  );
};
