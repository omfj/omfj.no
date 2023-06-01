import {PortableText} from "@portabletext/react";

import {fetchSiteSettings} from "@/lib/sanity/settings";

export default async function HomePage() {
  const settings = await fetchSiteSettings();

  return (
    <main className="text-center">
      <h1 className="mb-5 text-4xl font-bold">{settings.title}</h1>
      <PortableText value={settings.description} />
    </main>
  );
}
