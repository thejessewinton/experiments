import type { NextPage } from "next";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";

type SignInPageProps = {
  providers: ReturnType<typeof getProviders>;
};

const SignIn: NextPage<SignInPageProps> = ({ providers }) => {
  const { query } = useRouter();
  return (
    <div>
      <h1>Sign In</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: query.callbackUrl
                  ? String(query.callbackUrl)
                  : "/",
              })
            }
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SignIn;

export const getServerSideProps = async () => {
  return {
    props: {
      providers: await getProviders(),
    },
  };
};
