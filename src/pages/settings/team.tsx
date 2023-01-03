import { TeamForm } from "components/profiles/team-form/TeamForm";
import { SidebarLayout } from "layouts/sidebar/Sidebar";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import type { NextPageWithLayout } from "pages/_app";
import { getServerAuthSession } from "server/auth/get-server-auth-session";

const Candidate: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <TeamForm />
    </>
  );
};

Candidate.getLayout = (page) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default Candidate;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
