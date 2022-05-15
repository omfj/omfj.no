import { Center, Box, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import * as Emoji from "../../public/images/thinkingemoji.png";
import Main from "../components/main";
import SEO from "../components/SEO";

const Error = (): JSX.Element => {
  return (
    <>
      <SEO title="Page not found" />
      <Main>
        <Center flexDir="column" textAlign="center">
          <Heading>The page does not exist.</Heading>
          <NextLink href="/" passHref>
            <a>
              <Box pos="relative" w="200px" h="200px" overflow="hidden">
                <Image
                  src={Emoji}
                  alt="Emoji thinking"
                  objectFit="cover"
                  layout="fill"
                />
              </Box>
            </a>
          </NextLink>
          <Text fontSize="3xl">Error 404</Text>
        </Center>
      </Main>
    </>
  );
};

export default Error;
