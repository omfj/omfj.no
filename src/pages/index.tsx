import type { NextPage } from "next";
import Heading from "../components/heading";
import Main from "../components/main";
import SEO from "../components/SEO";
import t from "../static/english.json";

const Home: NextPage = () => {
  return (
    <>
      <SEO title="Ole Magnus" />
      <Main>
        <Heading>{t.home.title}</Heading>
        <p className="text-center text-lg my-10">{t.home.text}</p>
      </Main>
    </>
  );
};

export default Home;
