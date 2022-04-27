import Navbar from "./navbar";
import { Flex, Box, Spacer, Text } from "@chakra-ui/react";

const Header = (): JSX.Element => {
  return (
    <Box>
      <Flex
        alignItems="center"
        p="5"
        m="auto"
        mt="5"
        maxW="1000px"
        borderBottom="2px solid white"
        direction={["column", null, "row"]}
      >
        <Text fontSize="1.75rem">omfj.no</Text>
        <Spacer />
        <Navbar />
      </Flex>
    </Box>
  );
};

export default Header;
