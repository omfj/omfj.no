import { Box, BoxProps } from "@chakra-ui/react";

const Main = (props: BoxProps): JSX.Element => {
  return <Box m="auto" maxW="800px" p="10" {...props} />;
};

export default Main;
