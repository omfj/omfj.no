import Navbar from "./navbar";
import { Flex, Box, Spacer, Text } from "@chakra-ui/react";

const Header = (): JSX.Element => {
  return (
    <Box bg="darkblue">
      <Flex
        alignItems="center"
        p="5"
        m="auto"
        maxW="700px"
        direction={["column", "row"]}
      >
        <Text fontSize="1.5rem">omfj.no</Text>
        <Spacer />
        <Navbar />
      </Flex>
    </Box>
  );
};

export default Header;
