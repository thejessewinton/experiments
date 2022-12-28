import { useDroppable } from "@dnd-kit/core";
import { JobStatus } from "@prisma/client";
import { useEffect } from "react";
import { capitalize } from "utils/capitalize";
import type { RouterOutputs } from "utils/trpc";
import { JobCard } from "../job-card/JobCard";
import { StatusIndicator } from "../status-indicator/StatusIndicator";
import { useJobStore } from "client-data/state/use-job-store";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type JobsOutput = RouterOutputs["jobs"]["getAll"];

const BoardColumn = ({
  status,
  jobs,
}: {
  status: JobStatus;
  jobs: JobsOutput;
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const { activeStatus, setActiveStatus } = useJobStore();

  console.log("activeStatus", activeStatus);
  useEffect(() => {
    if (isOver && status !== activeStatus) {
      setActiveStatus(status);
    }
  }, [isOver, status, activeStatus, setActiveStatus]);

  return (
    <div>
      <div className="mb-6 flex items-center gap-1 text-xs">
        <StatusIndicator status={status} />
        {capitalize(status)}{" "}
        <span className="ml-3 text-neutral-500">
          {jobs.filter((job) => job.status === status).length}
        </span>
      </div>

      <div className="flex flex-col gap-6" ref={setNodeRef}>
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
          return (
            <SortableContext
              items={jobs}
              strategy={verticalListSortingStrategy}
              key={key}
            >
              <BoardColumn status={status} jobs={jobs} />
            </SortableContext>
          );
        })}
      </div>
    </>
  );
};
