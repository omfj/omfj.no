import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {IBM_Plex_Mono, Inter} from "next/font/google";
import Head from "next/head";
import {ThemeProvider} from "next-themes";

const inter = Inter({
  subsets: ["latin"],
});
const ibmPlexMono = IBM_Plex_Mono({
  weight: "400",
  subsets: ["latin"],
});

const ibmPlexMonoDisplay = IBM_Plex_Mono({
  weight: "700",
  subsets: ["latin"],
});

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --inter-font: ${inter.style.fontFamily};
            --ibm-font: ${ibmPlexMono.style.fontFamily};
            --ibm-display-font: ${ibmPlexMonoDisplay.style.fontFamily};
          }
        `}
      </style>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
