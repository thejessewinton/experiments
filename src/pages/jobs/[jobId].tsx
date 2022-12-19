import { useDialogStore } from "client-data/state/use-dialog-store";
import { Button } from "components/shared/button/Button";
import { NewJob } from "components/jobs/new-job/NewJob";
import { type NextPage } from "next";
import { trpc } from "utils/trpc";
import { useRouter } from "next/router";

const Jobs: NextPage = () => {
  const { query } = useRouter();
  const job = trpc.jobs.getJob.useQuery({ job_id: query.jobId as string });
  const { handleDialog } = useDialogStore();

  return (
    <div className="mt-3">
      <Button
        onClick={() => handleDialog({ title: "New Job", content: <NewJob /> })}
      >
        New Job
      </Button>
      <div className="grid grid-cols-3 gap-3">{JSON.stringify(job.data)}</div>
    </div>
  );
};

export default Jobs;
