import type { NextPage } from "next";
import Main from "../components/main";
import SEO from "../components/SEO";
import { Text, Center } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <>
      <SEO title="Ole Magnus" />
      <Main>
        <Center flexDirection="column" maxW="400px" m="auto">
          <Text
            textAlign="center"
            fontWeight="extrabold"
            textDecor="underline"
            fontSize="3xl"
          >
            Hello, WWW!
          </Text>
          <Text textAlign="center" fontSize="lg" my="5">
            My name is Ole Magnus. I am a student at the University of Bergen
            studying computer security.
          </Text>
        </Center>
      </Main>
    </>
  );
};

export default Home;
