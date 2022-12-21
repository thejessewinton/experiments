import { JobStatus } from "@prisma/client";
import { capitalize } from "utils/capitalize";
import type { RouterOutputs } from "utils/trpc";
import { JobCard } from "../job-card/JobCard";

const BoardColumn = ({
  status,
  jobs,
}: {
  status: JobStatus;
  jobs: RouterOutputs["jobs"]["getAll"];
}) => {
  return (
    <div>
      <div className="mb-3 flex gap-1 text-xs">
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

export const BoardView = ({
  jobs,
}: {
  jobs: RouterOutputs["jobs"]["getAll"];
}) => {
  return (
    <>
      <div className="mb-4 grid grid-cols-4 gap-6">
        {Object.entries(JobStatus).map(([key, status]) => {
          return <BoardColumn key={key} status={status} jobs={jobs} />;
        })}
      </div>
    </>
  );
};
