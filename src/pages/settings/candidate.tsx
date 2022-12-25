import { CandidateForm } from "components/profiles/candidate-form/CandidateForm";
import { type NextPage } from "next";
import Head from "next/head";

const Candidate: NextPage = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <CandidateForm />
    </>
  );
};

export default Candidate;
