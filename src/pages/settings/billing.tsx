import { SubscriptionForm } from "components/billing/subscription-form/SubscriptionForm";
import { TeamUsage } from "components/profiles/team-usage/TeamUsage";
import { SidebarLayout } from "layouts/sidebar/Sidebar";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import type { NextPageWithLayout } from "pages/_app";
import { getServerAuthSession } from "server/auth/get-server-auth-session";

const Billing: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <SubscriptionForm />
      <TeamUsage />
    </>
  );
};

Billing.getLayout = (page) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default Billing;

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
