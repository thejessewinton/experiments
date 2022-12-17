import type { Job } from "@prisma/client";

export const JobCard = ({ job }: { job: Job }) => {
  return (
    <div className="rounded-lg border border-neutral-600 bg-neutral-900 shadow-md shadow-black transition-all hover:cursor-pointer hover:shadow-lg hover:shadow-black">
      <div className="flex items-center justify-between px-4 py-2">
        <h1>{job.title}</h1>
        <p>{job.description}</p>
      </div>
    </div>
  );
};
