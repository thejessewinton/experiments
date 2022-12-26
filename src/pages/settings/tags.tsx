import { NewTagForm } from "components/tags/NewTagForm";
import { type NextPage } from "next";
import Head from "next/head";

const Tags: NextPage = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <NewTagForm />
    </>
  );
};

export default Tags;
