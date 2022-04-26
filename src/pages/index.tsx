import type { NextPage } from "next";
import Head from "next/head";
import Main from "../components/main";
import SEO from "../components/SEO";

const Home: NextPage = () => {
  return (
    <>
      <SEO title="omfj.no" />
      <Main>
        <h1>Hell world</h1>
      </Main>
    </>
  );
};

export default Home;
