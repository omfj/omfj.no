import type { NextPage } from "next";
import { motion } from "framer-motion";
import Heading from "../components/heading";
import Main from "../components/main";
import SEO from "../components/SEO";

const Home: NextPage = () => {
  return (
    <>
      <SEO title="Ole Magnus" />
      <Main>
        <Heading className="mb-5">Hello, WWW!</Heading>
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ ease: "easeOut", duration: 1.5 }}
          initial={{ opacity: 0 }}
          className={
            "text-center text-xl max-w-2xl m-auto px-2 flex flex-col gap-5"
          }
        >
          <p>
            My name is <b>Ole Magnus</b>. I am a student at the{" "}
            <b>University of Bergen</b> studying computer technology.
          </p>
          <p className="text-xl">
            You can reach me at:{" "}
            <a
              className="text-cyan-600 hover:underline"
              href="mailto:hei@omfj.no?body=Hei%20Ole%20Magnus!"
            >
              <b>hei@omfj.no</b>
            </a>
            .
          </p>
        </motion.div>
      </Main>
    </>
  );
};

export default Home;
