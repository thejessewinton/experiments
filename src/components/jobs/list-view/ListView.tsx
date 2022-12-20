import type { RouterOutputs } from "utils/trpc";

export const ListView = ({
  jobs,
}: {
  jobs: RouterOutputs["jobs"]["getAll"];
}) => {
  return (
    <>
      {jobs.map((job) => (
        <div key={job.id}>{job.title}</div>
      ))}
    </>
  );
};
