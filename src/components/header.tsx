import Navbar from "./navbar";
import { Flex, Box, Spacer, Text } from "@chakra-ui/react";
import HeaderLogo from "./header-logo";

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
      >
        <HeaderLogo />
        <Spacer />
        <Navbar />
      </Flex>
    </Box>
  );
};

export default Header;
