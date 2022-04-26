import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Layout from "../components/layout";

const colors = {
  dark: {
    900: "#000",
    100: "#FFF",
  },
  light: {
    900: "#FFF",
    100: "#000",
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default App;
