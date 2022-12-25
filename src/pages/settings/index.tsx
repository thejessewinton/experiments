import { NewJobForm } from "components/jobs/new-job-form/NewJobForm";
import { type NextPage } from "next";
import Head from "next/head";

const Settings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <NewJobForm />
    </>
  );
};

export default Settings;
