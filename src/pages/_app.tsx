import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import clsx from "clsx";
import { DefaultSeo } from "next-seo";

import { Inter } from "@next/font/google";
import { Header } from "components/header/Header";
import { Dialog } from "components/shared/dialog/Dialog";

const inter = Inter();

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <DefaultSeo defaultTitle="Experiments" />
      <SessionProvider session={session}>
        <main className={clsx("flex min-h-screen flex-col", inter.className)}>
          <Header />
          <Toaster
            position="bottom-left"
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
          <div className="relative mx-auto w-full max-w-7xl">
            <Component {...pageProps} />
          </div>
        </main>
        <Dialog />
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(App);
