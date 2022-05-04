import { Center, Flex, Box, Text, Spacer } from "@chakra-ui/react";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import IconLink from "./icon-link";

const Footer = (): JSX.Element => {
  return (
    <Box borderTop={["none", "2px solid white"]} w="100%">
      <Center
        flexDir={["column", "row"]}
        alignItems="center"
        maxW="1000px"
        m="auto"
        py="5"
        px="5"
        bg="omfj.acc"
      >
        <Text textAlign="center" my={[5, 0]}>
          Made with ❤️ by Ole Magnus
        </Text>

        <Spacer />

        <Flex alignItems="center">
          <IconLink icon={FaGithubSquare} link="https://github.com/omfj/" />
          <IconLink icon={FaLinkedin} link="https://linkedin.com/in/omfj/" />
        </Flex>
      </Center>
    </Box>
  );
};

export default Footer;
