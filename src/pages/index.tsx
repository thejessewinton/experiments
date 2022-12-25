import { NewJobForm } from "components/jobs/new-job-form/NewJobForm";
import { type NextPage } from "next";

const Index: NextPage = () => {
  return (
    <>
      <NewJobForm />
    </>
  );
};

export default Index;

export { getServerSideProps } from "backend/auth/redirect";
