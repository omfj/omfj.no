import type { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import Layout from "../components/layout";
import "../../styles/styles.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
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
    </>
  );
};

export default App;
