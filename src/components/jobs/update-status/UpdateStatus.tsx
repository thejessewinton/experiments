import { JobStatus } from "@prisma/client";
import { clsx } from "clsx";
import { Dropdown } from "components/shared/dropdown/Dropdown";
import { capitalize } from "utils/capitalize";
import { trpc } from "utils/trpc";

const StatusIndicator = ({ status }: { status: JobStatus }) => {
  const classNames =
    status === JobStatus.OFFERED
      ? "border-green-400"
      : status === JobStatus.CLOSED
      ? "border-red-400"
      : status === JobStatus.INTERVIEWING
      ? "border-purple-400"
      : "border-white";
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:dark:bg-neutral-800">
      <div
        className={clsx(
          "relative z-10 h-4 w-4 rounded-full border-2",
          classNames
        )}
      />
    </div>
  );
};

export const UpdateStatus = ({
  id,
  status,
}: {
  id: string;
  status: JobStatus;
}) => {
  const utils = trpc.useContext();

  const jobStatus = trpc.jobs.updateStatus.useMutation({
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
      <Dropdown trigger={<StatusIndicator status={status} />} align="left">
        {Object.entries(JobStatus).map(([key, value]) => {
          return (
            <Dropdown.Item key={key}>
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
