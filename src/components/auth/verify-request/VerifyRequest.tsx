export const VerifyRequest = () => {
  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-3">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-0.0981445 16C-0.0981438 7.16344 7.0653 -7.52254e-07 15.9019 0C22.399 5.67998e-07 27.9917 3.87258 30.4975 9.43544L9.3373 30.5956C8.42926 30.1866 7.56625 29.6953 6.75778 29.1313L19.8891 16H15.9019L4.58815 27.3137C1.69272 24.4183 -0.0981449 20.4183 -0.0981445 16Z"
          fill="#fff"
        />
        <path
          d="M31.9019 16.0055L15.9074 32C24.7396 31.997 31.8989 24.8377 31.9019 16.0055Z"
          fill="#fff"
        />
      </svg>
      <div className="flex w-full flex-col gap-4 rounded p-8 shadow-lg shadow-black/25 dark:bg-neutral-900">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h3 className="text-2xl">Check your email</h3>
          <span className="text-sm font-light text-neutral-400">
            Check your email for a link to sign in.
          </span>
        </div>
      </div>
    </div>
  );
};
