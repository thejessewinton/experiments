import { useDndMonitor, useDraggable } from "@dnd-kit/core";
import type { Job } from "@prisma/client";
import { JobStatus } from "@prisma/client";
import { Badge } from "components/shared/badge/Badge";
import Link from "next/link";
import { CSS } from "@dnd-kit/utilities";
import { trpc } from "utils/trpc";

import { useJobStore } from "client-data/state/use-job-store";

export const JobCard = ({ job }: { job: Job }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: job.id,
  });

  const utils = trpc.useContext();

  const status = trpc.jobs.updateStatus.useMutation({
    onSuccess: () => {
      utils.jobs.getAll.invalidate();
    },
  });
  const { activeStatus } = useJobStore();

  useDndMonitor({
    onDragEnd() {
      status.mutate({ job_id: job.id, status: activeStatus });
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="min-h-[225px] rounded-lg border border-neutral-600 bg-neutral-900 shadow-md shadow-black/30 transition-all hover:cursor-pointer hover:shadow-lg hover:shadow-black/30"
    >
      <div className="flex flex-col items-center justify-between px-4 py-4">
        <h3 className="text-base">{job.title}</h3>
        <p>{job.description}</p>
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
        <Link href={`/jobs/${job.id}`}>More</Link>
      </div>
    </div>
  );
};
