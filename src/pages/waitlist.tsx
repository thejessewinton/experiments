import { WaitlistForm } from "components/join/waitlist-form/WaitlistForm";
import { AuthLayout } from "layouts/auth/Auth";
import Head from "next/head";
import type { NextPageWithLayout } from "./_app";

const Waitlist: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Join the Waitlist</title>
      </Head>
      <WaitlistForm />
    </>
  );
};

export default Waitlist;

Waitlist.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};
