import { TeamSettingsForm } from "components/onboarding/team-settings-form/TeamSettingsForm";
import { type NextPage } from "next";

const Onboarding: NextPage = () => {
  return <TeamSettingsForm />;
};

export default Onboarding;

export { getServerSideProps } from "server/auth/get-server-redirect";
