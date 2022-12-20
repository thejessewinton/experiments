import { useDraggable } from "@dnd-kit/core";
import type { Job } from "@prisma/client";
import { JobStatus } from "@prisma/client";
import { Badge } from "components/shared/badge/Badge";
import Link from "next/link";
import { CSS } from "@dnd-kit/utilities";

export const JobCard = ({ job }: { job: Job }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: job.id,
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
      className="min-h-[250px] rounded-lg border border-neutral-600 bg-neutral-900 shadow-md shadow-black/30 transition-all hover:cursor-pointer hover:shadow-lg hover:shadow-black/30"
    >
      <div className="flex items-center justify-between px-4 py-2">
        <h1>{job.title}</h1>
        <p>{job.description}</p>
        <Badge
          variant="success"
          label={job.status === JobStatus.OPEN ? "Open" : "Closed"}
        />
        <Link href={`/jobs/${job.id}`}>More</Link>
      </div>
    </div>
  );
};
