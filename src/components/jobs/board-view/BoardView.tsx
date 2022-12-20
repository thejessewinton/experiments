import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { JobStatus } from "@prisma/client";
import { useJobStore } from "client-data/state/use-job-store";
import { capitalize } from "utils/capitalize";
import type { RouterOutputs } from "utils/trpc";
import { JobCard } from "../job-card/JobCard";
import { DndContext } from "@dnd-kit/core";

const BoardColumn = ({
  status,
  jobs,
}: {
  status: JobStatus;
  jobs: RouterOutputs["jobs"]["getAll"];
}) => {
  //const { activeStatus, setActiveStatus } = useJobStore();
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div ref={setNodeRef} data-status={status}>
      <div className="mb-3 flex gap-1 text-xs">
        {capitalize(status)}{" "}
        {jobs.filter((job) => job.status === status).length}
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
      <div className="mb-4 grid grid-cols-3 gap-6">
        {Object.entries(JobStatus).map(([key, status]) => {
          return (
            <DndContext key={key}>
              <BoardColumn status={status} jobs={jobs} />
            </DndContext>
          );
        })}
      </div>
    </>
  );
};
