import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import { Flex, Spacer } from "@chakra-ui/react";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

const PageLayout = ({ title, description, children }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Flex direction="column" minH="100vh">
        <Header />
        {children}
        <Spacer />
        <Footer />
      </Flex>
    </>
  );
};

export default PageLayout;
