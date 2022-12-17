import { useDialogStore } from "client-data/state/use-dialog-store";
import { Button } from "components/button/Button";
import { JobCard } from "components/jobs/job-card/JobCard";
import { NewJob } from "components/jobs/new-job/NewJob";
import { type NextPage } from "next";
import { trpc } from "utils/trpc";

const Jobs: NextPage = () => {
  const jobs = trpc.jobs.getAll.useQuery();
  const { handleDialog } = useDialogStore();

  return (
    <div className="mt-3">
      <Button onClick={() => handleDialog(<NewJob />)}>New Job</Button>
      <div className="grid grid-cols-3">
        {jobs.data?.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
