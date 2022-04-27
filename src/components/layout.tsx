import { Box, Center } from "@chakra-ui/react";
import Footer from "./footer";
import Header from "./header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <Box
      bg="omfj.bg"
      minH="100vh"
      color="white"
      pos="relative"
      overflow="hidden"
    >
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
