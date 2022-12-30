import { SubscriptionForm } from "components/billing/subscription-form/SubscriptionForm";
import { SidebarLayout } from "layouts/sidebar/Sidebar";
import Head from "next/head";
import type { NextPageWithLayout } from "pages/_app";

const Billing: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <SubscriptionForm />
    </>
  );
};

Billing.getLayout = (page) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default Billing;

export { getServerSideProps } from "server/auth/redirect";
