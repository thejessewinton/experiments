import type { Job } from "@prisma/client";
import { JobStatus } from "@prisma/client";
import { Dropdown } from "components/shared/dropdown/Dropdown";
import { capitalize } from "utils/capitalize";
import { ViewfinderCircleIcon } from "@heroicons/react/24/outline";

import { trpc } from "utils/trpc";

const UpdateStatus = ({ id }: { id: string }) => {
  const utils = trpc.useContext();

  const status = trpc.jobs.updateStatus.useMutation({
    onSuccess: () => {
      utils.jobs.getAll.invalidate();
    },
  });

  return (
    <div>
      <Dropdown trigger={<ViewfinderCircleIcon className="h-4 w-4" />}>
        {Object.entries(JobStatus).map(([key, value]) => {
          return (
            <Dropdown.Item key={key}>
              <button
                onClick={() => status.mutate({ job_id: id, status: value })}
                className="text-xs"
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

export const JobCard = ({ job }: { job: Job }) => {
  return (
    <div className="min-h-[225px] rounded-lg border border-neutral-600 bg-neutral-900 shadow-md shadow-black/30 transition-all hover:cursor-pointer hover:shadow-lg hover:shadow-black/30">
      <div className="flex flex-col items-center justify-between px-6 py-4">
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase text-neutral-400">
              {job.category}
            </span>
            <h3 className="text-base">{job.title}</h3>
          </div>

          <div className="flex items-center justify-center gap-2">
            {/* <Badge
              variant="success"
              label={
                job.status === JobStatus.OPEN
                  ? "Open"
                  : JobStatus.INTERVIEWING
                  ? "Interviewing"
                  : JobStatus.OFFERED
                  ? "Offered"
                  : "Closed"
              }
            /> */}
            <UpdateStatus id={job.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
