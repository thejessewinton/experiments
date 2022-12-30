import { VerifyRequest } from "components/auth/verify-request/VerifyRequest";
import { AuthLayout } from "layouts/auth/Auth";
import Head from "next/head";
import type { NextPageWithLayout } from "./_app";

const SignIn: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <VerifyRequest />
    </>
  );
};

export default SignIn;

SignIn.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};
