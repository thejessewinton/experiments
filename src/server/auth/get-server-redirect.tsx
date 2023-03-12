import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "server/auth/get-server-auth-session";

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

export const withAuth = async (gssp: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await getServerAuthSession(ctx);

    if (!session) {
      return {
        redirect: {
          destination: "/sign-in",
          permanent: false,
        },
      };
    }

    const gsspData = await gssp(ctx);

    return {
      props: {
        ...gsspData,
        session,
      },
    };
  };
};
