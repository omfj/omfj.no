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
        <Heading>Hello, WWW!</Heading>
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ ease: "easeOut", duration: 1.5 }}
          initial={{ opacity: 0 }}
          className="text-center"
        >
          <p className="my-10 text-lg">
            My name is Ole Magnus. I am a student at the University of Bergen
            studying computer security.
          </p>
          <p className="text-lg">
            You can reach me at:{" "}
            <a
              className="text-cyan-600 text-lg hover:underline"
              href="mailto:hei@omfj.no"
            >
              hei@omfj.no
            </a>
            .
          </p>
        </motion.div>
      </Main>
    </>
  );
};

export default Home;
