import type { Job } from "@prisma/client";
import { JobStatus } from "@prisma/client";
import { Badge } from "components/shared/badge/Badge";
import { Dropdown } from "components/shared/dropdown/Dropdown";
import { toast } from "react-hot-toast";
import { capitalize } from "utils/capitalize";

import { trpc } from "utils/trpc";

const UpdateStatus = ({ id }: { id: string }) => {
  const utils = trpc.useContext();

  const status = trpc.jobs.updateStatus.useMutation({
    onSuccess: (data) => {
      utils.jobs.getAll.invalidate();
      toast.success(`Status updated to ${capitalize(data.status)}`);
    },
  });

  return (
    <div>
      <Dropdown trigger={<button>*</button>}>
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
      <div className="flex flex-col items-center justify-between px-4 py-4">
        <h3 className="text-base">{job.title}</h3>

        <Badge
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
        />
        <UpdateStatus id={job.id} />
      </div>
    </div>
  );
};
