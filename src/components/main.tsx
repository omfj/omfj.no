import { Box, BoxProps } from "@chakra-ui/react";

const Main = (props: BoxProps): JSX.Element => {
  return (
    <Box m="auto" overflow="hidden" maxW="1000px" w="100%" p="5" {...props} />
  );
};

export default Main;
