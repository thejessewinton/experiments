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
import { DndContext } from "@dnd-kit/core";

const inter = Inter();

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <DndContext>
      <DefaultSeo defaultTitle="Experiments" />
      <SessionProvider session={session}>
        <main
          className={clsx(
            "flex h-screen flex-col bg-neutral-900",
            inter.className
          )}
        >
          <Header />
          <Toaster position="bottom-left" />
          <div className="relative mx-auto w-full max-w-7xl">
            <Component {...pageProps} />
          </div>
        </main>
        <Dialog />
      </SessionProvider>
    </DndContext>
  );
};

export default trpc.withTRPC(App);
