import { trpc } from "utils/trpc";
import { useRouter } from "next/router";
import { Spinner } from "components/shared/spinner/Spinner";
import type { NextPageWithLayout } from "pages/_app";
import { EditJobForm } from "components/jobs/edit-job-form/EditJobForm";
import Head from "next/head";

const Job: NextPageWithLayout = () => {
  const router = useRouter();

  const job = trpc.jobs.getJob.useQuery({ slug: router.query.slug as string });

  if (job.isLoading || !job.data) return <Spinner />;

  return (
    <>
      <Head>
        <title>{job.data.title}</title>
      </Head>
      <div className="mt-3">
        <div className="flex flex-col">
          <EditJobForm job={job.data} />
        </div>
      </div>
    </>
  );
};

export default Job;

export { getServerSideProps } from "backend/auth/redirect";
