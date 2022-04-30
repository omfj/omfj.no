import { Box, Center, Flex } from "@chakra-ui/react";
import Footer from "./footer";
import Header from "./header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <Flex bg="omfj.bg" minH="100vh" color="white" direction="column">
      <Header />
      {children}
      <Footer />
    </Flex>
  );
};

export default Layout;
