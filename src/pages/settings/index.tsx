import { ProfileForm } from "components/profiles/profile-form/ProfileForm";
import { SidebarLayout } from "layouts/sidebar/Sidebar";
import Head from "next/head";
import type { NextPageWithLayout } from "pages/_app";

const Settings: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <ProfileForm />
    </>
  );
};

Settings.getLayout = (page) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default Settings;
