import { NewTagForm } from "components/tags/new-tag-form/NewTagForm";
import { SidebarLayout } from "layouts/sidebar/Sidebar";
import Head from "next/head";
import type { NextPageWithLayout } from "pages/_app";

const Tags: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <NewTagForm />
    </>
  );
};

Tags.getLayout = (page) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default Tags;
