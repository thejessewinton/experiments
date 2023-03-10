import { JobStatus } from "@prisma/client";
import { capitalize } from "utils/capitalize";
import type { RouterOutputs } from "utils/api";
import { JobRow } from "../job-row/JobRow";
import { StatusIndicator } from "../status-indicator/StatusIndicator";

const ListRow = ({
  status,
  jobs,
}: {
  status: JobStatus;
  jobs: RouterOutputs["jobs"]["getAll"];
}) => {
  return (
    <div className="mt-6">
      <div className="my-4 flex items-center gap-1 text-xs">
        <StatusIndicator status={status} />
        {capitalize(status)}{" "}
        <span className="ml-3 text-neutral-500">
          {jobs.filter((job) => job.status === status).length}
        </span>
      </div>

      <div className="flex flex-col">
        {jobs
          .filter((job) => job.status === status)
          .map((job) => (
            <JobRow job={job} key={job.id} />
          ))}
      </div>
    </div>
  );
};

export const ListView = ({
  jobs,
}: {
  jobs: RouterOutputs["jobs"]["getAll"];
}) => {
  return (
    <div className="mt-6">
      {Object.entries(JobStatus).map(([key, status]) => {
        return <ListRow key={key} status={status} jobs={jobs} />;
      })}
    </div>
  );
};
