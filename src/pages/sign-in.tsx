import { AuthForm } from "components/auth/auth-form/AuthForm";
import { AuthLayout } from "layouts/auth/Auth";
import { getCsrfToken, getProviders } from "next-auth/react";
import Head from "next/head";
import type { NextPageWithLayout } from "./_app";

export type ProvidersType = ReturnType<typeof getProviders>;

type SignInPageProps = {
  providers: ProvidersType;
  csrfToken: string;
};

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
  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(),
    },
  };
};
