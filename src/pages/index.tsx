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
          className="text-center max-w-lg m-auto px-2"
        >
          <p className="my-10 text-2xl font-extralight">
            My name is <span className="font-bold">Ole Magnus</span>. I am a
            student at the{" "}
            <span className="font-bold">University of Bergen</span> studying
            computer security.
          </p>
          <p className="text-xl">
            You can reach me at:{" "}
            <a
              className="text-cyan-600 text-lg font-extrabold hover:underline"
              href="mailto:hei@omfj.no?body=Hei%20Ole%20Magnus!"
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
