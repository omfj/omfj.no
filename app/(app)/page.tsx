import {notFound} from "next/navigation";
import {PortableText} from "@portabletext/react";

import {fetchSiteSettings} from "@/lib/sanity/settings";
import {isErrorMessage} from "@/utils/error";

const Home = async () => {
  const settings = await fetchSiteSettings();

  if (isErrorMessage(settings)) {
    notFound();
  }

  return (
    <main className="text-center">
      <h1 className="mb-5 text-4xl font-bold">{settings.title}</h1>
      <PortableText value={settings.description} />
    </main>
  );
};

export default Home;
