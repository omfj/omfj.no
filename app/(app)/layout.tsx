import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import "@/styles/globals.css";
import {Metadata} from "next";
import {IBM_Plex_Mono, Inter} from "next/font/google";

import {cn} from "@/utils/cn";

export const metadata: Metadata = {
  title: {
    default: "omfj.no",
    template: "%s | omfj.no",
  },
  description: "My (omfj) personal website",
  themeColor: "#ffffff",
  icons: {
    icon: "/favicon.ico",
  },
};

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const ibmPlexMono = IBM_Plex_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({children}: Props) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white font-primary text-slate-900 antialiased",
        inter.variable,
        ibmPlexMono.variable,
      )}
    >
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="mx-auto w-full max-w-3xl flex-1 px-5 py-10">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
