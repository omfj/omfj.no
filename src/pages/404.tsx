import { Center, Button, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import Main from "../components/main";
import SEO from "../components/SEO";

const Error = (): JSX.Element => {
  return (
    <>
      <SEO title="Page not found" />
      <Main>
        <Center flexDir="column" textAlign="center">
          <Heading>The page does not exist.</Heading>
          <Text fontSize="3xl">Error 404</Text>
          <Button my="5" size="lg">
            <NextLink href="/" passHref>
              Home
            </NextLink>
          </Button>
        </Center>
      </Main>
    </>
  );
};

export default Error;
