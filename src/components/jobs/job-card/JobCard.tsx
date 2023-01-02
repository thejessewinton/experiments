import { makePlural } from "utils/make-plural";
import type { RouterOutputs } from "utils/trpc";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Dropdown } from "components/shared/dropdown/Dropdown";
import { trpc } from "utils/trpc";
import { AddTag } from "../add-tag/AddTag";
import { UpdateStatus } from "../update-status/UpdateStatus";
import dayjs from "utils/dayjs";
import Image from "next/image";

const Actions = ({ id }: { id: string }) => {
  const utils = trpc.useContext();

  const deleteJob = trpc.jobs.deleteJob.useMutation({
    onMutate: (data) => {
      const previousJobs = utils.jobs.getAll.getData();
      const newJobs = previousJobs?.filter((job) => job.id !== data.job_id);
      utils.jobs.getAll.setData((() => undefined)(), newJobs);
    },
  });

  return (
    <div className="relative">
      <Dropdown
        trigger={
          <div className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:dark:bg-neutral-800">
            <EllipsisHorizontalIcon className="h-4 w-4" />
          </div>
        }
        triggerClassName="rounded"
        className="w-32"
        align="left"
      >
        <Dropdown.Item>
          <button
            onClick={() => deleteJob.mutate({ job_id: id })}
            className="flex w-full items-center gap-2 text-left text-xs"
          >
            Delete Job
          </button>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export const JobCard = ({
  job,
}: {
  job: RouterOutputs["jobs"]["getAll"][0];
}) => {
  return (
    <div className="rounded-lg border border-neutral-400 shadow-sm shadow-black/30 transition-all dark:border-neutral-800 dark:bg-neutral-900">
      <div className="h-full px-5 py-4">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="mt-2 text-sm">{job.title}</h3>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Actions id={job.id} />
          </div>
        </div>
        <div className="mt-8 mb-0 flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            {job.candidates.map((candidate) => {
              return (
                <Image
                  src={candidate.user.image as string}
                  alt="Candidate"
                  width={20}
                  height={20}
                  key={candidate.id}
                  className="rounded-full"
                />
              );
            })}
            <span className="text-2xs text-neutral-600">
              {job._count.candidates}
              {makePlural(" Candidate", job._count.candidates)}
            </span>
          </div>
          <div>
            {job.due_date ? (
              <span className="text-2xs text-neutral-600">
                {dayjs(job.due_date).format("MMM DD")}
              </span>
            ) : null}

            <div className="flex items-center gap-1">
              <UpdateStatus id={job.id} status={job.status} />
              <AddTag id={job.id} tags={job.tags} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
