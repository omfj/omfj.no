import Navbar from "./navbar";
import NextLink from "next/link";
import { Flex, Box, Spacer, Text } from "@chakra-ui/react";

const Header = (): JSX.Element => {
  return (
    <Box>
      <Flex
        alignItems="center"
        px="5"
        m="auto"
        mt="5"
        maxW="1000px"
        boxShadow="inset 0 -2px 0 #333"
        direction={["column", null, "row"]}
      >
        <NextLink href="/" passHref>
          <Text
            fontWeight="extrabold"
            fontSize={["2.25rem", "2rem"]}
            _hover={{ cursor: "pointer" }}
          >
            omfj.no
          </Text>
        </NextLink>
        <Spacer />
        <Navbar />
      </Flex>
    </Box>
  );
};

export default Header;
