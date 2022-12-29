import { ProfileForm } from "components/profiles/profile-form/ProfileForm";
import { NewTagForm } from "components/tags/new-tag-form/NewTagForm";
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
      <NewTagForm />
    </>
  );
};

Settings.getLayout = (page) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default Settings;

export { getServerSideProps } from "backend/auth/redirect";
