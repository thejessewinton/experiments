import { JobStatus } from "@prisma/client";
import { clsx } from "clsx";

export const StatusIndicator = ({ status }: { status: JobStatus }) => {
  const classNames =
    status === JobStatus.OFFERED
      ? "border-green-400"
      : status === JobStatus.CLOSED
      ? "border-purple-400"
      : status === JobStatus.INTERVIEWING
      ? "border-yellow-400"
      : "border-white";
  return (
    <div className="flex h-8 w-8 items-center justify-center">
      <div
        className={clsx(
          "relative z-10 h-4 w-4 rounded-full border-2",
          classNames
        )}
      />
    </div>
  );
};
