import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import type { ProvidersType } from "pages/sign-in";
import type { ReactNode } from "react";
import { Button } from "components/shared/button/Button";
import { useForm } from "react-hook-form";
import { Input } from "components/shared/input/Input";
import { z } from "zod";

const Icons: { [key: string]: ReactNode } = {
  google: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.8671 6.14842C14.9563 6.6518 15.0007 7.16182 15 7.67274C15 9.95454 14.1679 11.8839 12.72 13.1897H12.7219C11.4556 14.3363 9.71499 15 7.6511 15C5.62191 15 3.67582 14.2099 2.24096 12.8034C0.806096 11.3969 0 9.48931 0 7.50025C0 5.51119 0.806096 3.6036 2.24096 2.19712C3.67582 0.790645 5.62191 0.000494877 7.6511 0.000494877C9.55043 -0.0213091 11.3847 0.678128 12.7697 1.95231L10.5853 4.09348C9.79569 3.35567 8.74186 2.95164 7.6511 2.96852C5.65512 2.96852 3.95945 4.28848 3.35501 6.06592C3.03453 6.9973 3.03453 8.00601 3.35501 8.93739H3.35788C3.96519 10.712 5.65799 12.032 7.65397 12.032C8.68496 12.032 9.57058 11.7732 10.2573 11.3157H10.2544C10.6531 11.0568 10.9942 10.7214 11.257 10.3297C11.5199 9.93801 11.699 9.49818 11.7837 9.03676H7.6511V6.14935H14.8671V6.14842Z"
        fill="currentColor"
      />
    </svg>
  ),
};

const AuthSchema = z.object({
  email: z.string().email("Enter a real email please."),
});

export const AuthForm = ({
  providers,
  csrfToken,
}: {
  providers: ProvidersType;
  csrfToken: string;
}) => {
  const { query } = useRouter();
  const { register, handleSubmit } = useForm<{ email: string }>();

  const onSubmit = async (values: z.infer<typeof AuthSchema>) => {
    await signIn("email", {
      email: values.email,
      callbackUrl: query.callbackUrl ? String(query.callbackUrl) : "/",
    });
  };

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-3">
      Experiments
      <div className="flex w-full flex-col gap-4 rounded p-8 shadow-lg shadow-black/25 dark:bg-neutral-900">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h3 className="text-2xl">Welcome back</h3>
          <span className="text-sm font-light text-neutral-400">
            Enter your email to sign into your account
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Input
            label="Email address"
            {...register("email")}
            type="email"
            placeholder="Email address"
          />
          <Button type="submit" className="!w-full">
            Sign in with Email
          </Button>
        </form>

        {/* <div className="mt-4 flex items-center gap-4 text-center text-sm font-light">
          <div className="h-px flex-1 bg-neutral-700"></div>
          <span className="text-neutral-400">Or sign in with</span>
          <div className="h-px flex-1 bg-neutral-700"></div>
        </div> */}

        {/* <div className="mt-4 flex flex-col items-center justify-center gap-4">
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
        </div> */}
      </div>
    </div>
  );
};
