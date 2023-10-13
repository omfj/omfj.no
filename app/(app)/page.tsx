import { PortableText } from "@portabletext/react";

import { SocialItem } from "@/components/social-item";
import { fetchSiteSettings } from "@/lib/sanity/settings/settings";

export default async function HomePage() {
  const settings = await fetchSiteSettings();

  return (
    <div className="mx-auto max-w-6xl">
      <main className="max-w-xl">
        <h1 className="mb-5 text-4xl">{settings.title}</h1>
        <div className="mb-10">
          <PortableText value={settings.description} />
        </div>

        <ul>
          {settings.socialMedia.map((socialMedia) => (
            <SocialItem key={socialMedia._key} {...socialMedia} />
          ))}
        </ul>
      </main>
    </div>
  );
}
