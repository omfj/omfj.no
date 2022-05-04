import Navbar from "./navbar";
import NextLink from "next/link";
import { Flex, Box, Spacer, Text } from "@chakra-ui/react";

const Header = (): JSX.Element => {
  return (
    <Box>
      <Flex
        alignItems="baseline"
        p="5"
        m="auto"
        mt="5"
        maxW="1000px"
        borderBottom="2px solid white"
        direction={["column", null, "row"]}
      >
        <NextLink href="/" passHref>
          <Text className="hover-pointer" fontSize={["2.25rem", "2rem"]}>
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
