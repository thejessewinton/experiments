import { TeamForm } from "components/profiles/team-form/TeamForm";
import { SidebarLayout } from "layouts/sidebar/Sidebar";
import Head from "next/head";
import type { NextPageWithLayout } from "pages/_app";

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

export { getServerSideProps } from "server/auth/redirect";
