import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import type { ProvidersType } from "pages/sign-in";
import type { ReactNode } from "react";
import { Input } from "components/shared/input/Input";
import { Button } from "components/shared/button/Button";

const Icons: { [key: string]: ReactNode } = {
  github: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
        fill="currentColor"
        fillRule="evenodd"
        clip-rule="evenodd"
      />
    </svg>
  ),
  google: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
      />
    </svg>
  ),
};

export const AuthForm = ({
  providers,
  csrfToken,
}: {
  providers: ProvidersType;
  csrfToken: string;
}) => {
  const { query } = useRouter();

  return (
    <div className="flex w-full max-w-lg flex-col gap-4 rounded p-8 shadow-lg shadow-black/25 dark:bg-neutral-900">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h3 className="text-2xl">Welcome back</h3>
        <span className="text-sm font-light text-neutral-400">
          Enter your email to sign into your account
        </span>
      </div>

      <form
        method="post"
        action="/api/auth/signin/email"
        className="flex flex-col gap-4"
      >
        <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <Input
          name="email"
          type="email"
          placeholder="Email address"
          label="Email"
        />
        <Button type="submit" className="!w-full">
          Sign in with Email
        </Button>
      </form>

      <div className="mt-4 flex items-center gap-4 text-center text-sm font-light">
        <div className="h-px flex-1 bg-neutral-700"></div>
        <span className="text-neutral-400">Or sign in with</span>
        <div className="h-px flex-1 bg-neutral-700"></div>
      </div>

      <div className="mt-4 flex flex-col items-center justify-center gap-4">
        {Object.values(providers)
          .filter((provider) => provider.name !== "Email")
          .map((provider) => (
            <Button
              key={provider.name}
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: query.callbackUrl
                    ? String(query.callbackUrl)
                    : "/",
                })
              }
              className="!w-full"
            >
              {Icons[provider.name.toLowerCase()]}
              <span>{provider.name}</span>
            </Button>
          ))}
      </div>
    </div>
  );
};
