import { AuthForm } from "components/auth/auth-form/AuthForm";
import { AuthLayout } from "layouts/auth/Auth";
import type { InferGetServerSidePropsType } from "next";
import { getCsrfToken, getProviders } from "next-auth/react";
import Head from "next/head";
import type { NextPageWithLayout } from "./_app";

export type SignInPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const SignIn: NextPageWithLayout<SignInPageProps> = ({
  providers,
  csrfToken,
}) => {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>

      <AuthForm providers={providers} csrfToken={csrfToken} />
    </>
  );
};

export default SignIn;

SignIn.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export const getServerSideProps = async () => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();

  return {
    props: {
      providers,
      csrfToken,
    },
  };
};
