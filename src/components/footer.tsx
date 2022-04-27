import { Center, Flex, Box, Icon, Text, Spacer } from "@chakra-ui/react";
import { FaGit, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import IconLink from "./icon-link";

const Footer = (): JSX.Element => {
  return (
    <Center
      flexDir={["column", "row"]}
      pos="absolute"
      bottom="0"
      alignItems="center"
      w="100%"
      py="5"
      px="10"
      borderTop="2px solid white"
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
  );
};

export default Footer;
