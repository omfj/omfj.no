import { Box, BoxProps } from "@chakra-ui/react";

const Main = (props: BoxProps): JSX.Element => {
  return <Box m="auto" maxW="1000px" p="10" mb="10" {...props} />;
};

export default Main;
