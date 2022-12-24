import { JobStatus } from "@prisma/client";
import { capitalize } from "utils/capitalize";
import type { RouterOutputs } from "utils/trpc";

const ListRow = ({
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
            <div className="flex" key={job.id}>
              {job.title}
            </div>
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
    <>
      {Object.entries(JobStatus).map(([key, status]) => {
        return <ListRow key={key} status={status} jobs={jobs} />;
      })}
    </>
  );
};
