import type { NextPage } from "next";
import Main from "../components/main";
import SEO from "../components/SEO";
import t from "../static/english.json";
import { Text, Center, Heading } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <>
      <SEO title="Ole Magnus" />
      <Main>
        <Center flexDirection="column" maxW="400px" m="auto">
          <Heading fontWeight="extrabold" textDecor="underline">
            {t.home.title}
          </Heading>
          <Text textAlign="center" fontSize="lg" my="5">
            {t.home.text}
          </Text>
        </Center>
      </Main>
    </>
  );
};

export default Home;
