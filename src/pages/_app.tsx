import type { AppProps } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";

import "../styles/globals.css";

import { Dialog } from "components/shared/dialog/Dialog";
import Head from "next/head";
import { SearchProvider } from "context/search/SearchProvider";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import { DefaultLayout } from "layouts/default/Default";
import { Toaster } from "react-hot-toast";
import { Inter, Newsreader } from "@next/font/google";

const inter = Inter({ variable: "--font-inter", display: "optional" });
const newsreader = Newsreader({
  variable: "--font-newsreader",
  display: "optional",
  style: "italic",
});

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session: Session | null;
};

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ||
    ((page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <>
      <Head>
        <title>Experiements</title>
      </Head>
      <SessionProvider session={session}>
        <SearchProvider>
          <Toaster
            position="bottom-right"
            gutter={8}
            toastOptions={{
              duration: 5000,
              style: {
                background: "#222",
                color: "#fff",
                border: "0",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                fontSize: "0.75rem",
              },
            }}
          />
          <div className={`${inter.variable} ${newsreader.variable} font-sans`}>
            {getLayout(<Component {...pageProps} />)}
          </div>
        </SearchProvider>

        <Dialog />
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(App);
