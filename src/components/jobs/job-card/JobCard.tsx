import { JobStatus } from "@prisma/client";
import { clsx } from "clsx";
import { Dropdown } from "components/shared/dropdown/Dropdown";
import { capitalize } from "utils/capitalize";

import type { RouterOutputs } from "utils/trpc";
import { trpc } from "utils/trpc";

const StatusIndicator = ({ status }: { status: JobStatus }) => {
  const classNames =
    status === JobStatus.OFFERED
      ? "border-green-500"
      : status === JobStatus.CLOSED
      ? "border-red-500"
      : status === JobStatus.INTERVIEWING
      ? "border-purple-500"
      : "border-white";
  return (
    <div
      className={clsx(
        "relative z-10 h-4 w-4 rounded-full border-2",
        classNames
      )}
    />
  );
};

const UpdateStatus = ({ id, status }: { id: string; status: JobStatus }) => {
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
    <div className="relative z-10">
      <Dropdown trigger={<StatusIndicator status={status} />}>
        {Object.entries(JobStatus).map(([key, value]) => {
          return (
            <Dropdown.Item key={key}>
              <button
                onClick={() => jobStatus.mutate({ job_id: id, status: value })}
                className="w-full text-left text-xs"
              >
                {capitalize(value)}
              </button>
            </Dropdown.Item>
          );
        })}
      </Dropdown>
    </div>
  );
};

export const JobCard = ({
  job,
}: {
  job: RouterOutputs["jobs"]["getAll"][0];
}) => {
  return (
    <div className="rounded-lg border border-neutral-600 bg-neutral-900 shadow-md shadow-black/30 transition-all hover:cursor-pointer hover:shadow-lg hover:shadow-black/30">
      <div className="h-full px-6 py-4">
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase text-neutral-400">
              {job.category}
            </span>
            <h3 className="text-base">{job.title}</h3>
          </div>

          <div className="flex items-center justify-center gap-2">
            <UpdateStatus id={job.id} status={job.status} />
          </div>
        </div>
        <div className="mt-auto mb-0 flex flex-col gap-1">
          <span className="text-[10px] uppercase text-neutral-400">
            {job._count.candidates} Candidates
          </span>
        </div>
      </div>
    </div>
  );
};
