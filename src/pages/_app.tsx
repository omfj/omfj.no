import type { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Layout from "../components/layout";
import "../../styles/styles.css";

const colors = {
  omfj: {
    // bg: "#141b29",
    // acc: "#0c1018",
    bg: "#000",
    acc: "#000",
  },
};

const theme = extendTheme({ colors });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <NextNProgress
        color="#FFF"
        startPosition={0.15}
        stopDelayMs={200}
        height={4}
        options={{ showSpinner: false }}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default App;
