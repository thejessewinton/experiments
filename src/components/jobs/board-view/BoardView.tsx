import { JobStatus } from "@prisma/client";
import { capitalize } from "utils/capitalize";
import type { RouterOutputs } from "utils/api";
import { JobCard } from "../job-card/JobCard";
import { StatusIndicator } from "../status-indicator/StatusIndicator";

type JobsOutput = RouterOutputs["jobs"]["getAll"];

const BoardColumn = ({
  status,
  jobs,
}: {
  status: JobStatus;
  jobs: JobsOutput;
}) => {
  return (
    <div>
      <div className="mb-6 flex items-center gap-1 text-xs">
        <StatusIndicator status={status} />
        {capitalize(status)}{" "}
        <span className="ml-3 text-neutral-500">
          {jobs.filter((job) => job.status === status).length}
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {jobs
          .filter((job) => job.status === status)
          .map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
      </div>
    </div>
  );
};

export const BoardView = ({ jobs }: { jobs: JobsOutput }) => {
  return (
    <>
      <div className="mb-4 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(JobStatus).map(([key, status]) => {
          return <BoardColumn key={key} status={status} jobs={jobs} />;
        })}
      </div>
    </>
  );
};
