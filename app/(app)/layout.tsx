import "@/styles/globals.css";
import { Metadata } from "next";

import { Footer } from "@/components/site-footer";
import { Header } from "@/components/site-header";
import { baseUrl } from "@/config";
import { cn } from "@/utils/cn";
import { ibmPlexMono, inter } from "./fonts";

export const metadata: Metadata = {
  title: {
    default: "omfj.no",
    template: "%s | omfj.no",
  },
  metadataBase: new URL(baseUrl),
  description: "My (omfj) personal website",
  themeColor: "#ffffee",
  icons: {
    icon: "/favicon.ico",
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={cn(inter.variable, ibmPlexMono.variable)}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <div className="w-full flex-1 px-5 py-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
