import { type NextPage } from "next";
import { api } from "utils/api";
import { useView } from "client-data/hooks/use-view";
import { ListView } from "components/jobs/list-view/ListView";
import { BoardView } from "components/jobs/board-view/BoardView";
import { Spinner } from "components/shared/spinner/Spinner";
import { ViewState } from "@prisma/client";
import Head from "next/head";
import { appRouter } from "server/trpc/router/_app";
import { createContext } from "server/trpc/context";
import superjson from "superjson";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

const Jobs: NextPage = () => {
  const jobs = api.jobs.getAll.useQuery();
  const view = useView();

  return (
    <>
      <Head>
        <title>Jobs</title>
      </Head>
      <div className="mt-3">
        {jobs.data ? (
          view === ViewState.LIST ? (
            <ListView jobs={jobs.data} />
          ) : (
            <BoardView jobs={jobs.data} />
          )
        ) : jobs.isLoading ? (
          <Spinner />
        ) : (
          "No jobs found..."
        )}
      </div>
    </>
  );
};

export default Jobs;

export const getServerSideProps = async (ctx: CreateNextContextOptions) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(ctx),
    transformer: superjson,
  });

  await ssg.jobs.getAll.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
