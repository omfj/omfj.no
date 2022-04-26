import { Box, Center } from "@chakra-ui/react";
import Header from "./header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <Box bg="black" minH="100vh" color="white">
      <Header />
      {children}
    </Box>
  );
};

export default Layout;
