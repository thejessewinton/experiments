import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head />
      <body className="text-sm text-neutral-900 dark:bg-neutral-900 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
