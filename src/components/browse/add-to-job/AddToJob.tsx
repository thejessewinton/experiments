import { PlusIcon } from "@heroicons/react/24/outline";
import { useBrowseParams } from "client-data/hooks/use-browse-params";
import { Dropdown } from "components/shared/dropdown/Dropdown";
import { toast } from "react-hot-toast";
import { trpc } from "utils/trpc";

export const AddToJob = ({ id }: { id: string }) => {
  const utils = trpc.useContext();
  const jobs = trpc.jobs.getAll.useQuery();
  const params = useBrowseParams();

  const candidateStatus = trpc.browse.addToJob.useMutation({
    onMutate: (data) => {
      const previousCandidates = utils.browse.getCandidates.getData(params);
      const newCandidates = previousCandidates?.map((candidate) => {
        if (candidate.id === data.candidate_id) {
          return { ...candidate, _count: { jobs: candidate._count.jobs + 1 } };
        }
        return candidate;
      });
      utils.browse.getCandidates.setData(
        (() => {
          return params;
        })(),
        newCandidates
      );
    },
    onSuccess: (data) => {
      utils.browse.getCandidates.invalidate();
      toast.success(`Candidate added to ${data.title}`);
    },
  });

  return (
    <div className="relative">
      <Dropdown
        trigger={
          <div className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:dark:bg-neutral-800">
            <PlusIcon className="h-4 w-4" />
          </div>
        }
        className="w-48"
        align="left"
      >
        {jobs.data?.map((job) => (
          <Dropdown.Item key={job.id}>
            <button
              onClick={() =>
                candidateStatus.mutate({ job_id: job.id, candidate_id: id })
              }
              className="flex w-full items-center gap-2 text-left text-xs"
            >
              {job.title}
            </button>
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
};
