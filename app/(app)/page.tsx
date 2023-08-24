import { PortableText } from "@portabletext/react";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

import { XIcon } from "@/components/icons/x";
import { SocialItem } from "@/components/social-item";
import { fetchSiteSettings } from "@/lib/sanity/settings/settings";

export default async function HomePage() {
  const settings = await fetchSiteSettings();

  const iconClasses = "h-8 w-8 text-slate-800";

  return (
    <main className="mx-auto max-w-xl">
      <h1 className="mb-5 text-4xl font-bold">{settings.title}</h1>
      <div className="mb-10">
        <PortableText value={settings.description} />
      </div>
      <ul>
        {/* GitHub */}
        <SocialItem
          platform="GitHub"
          username="@omfj"
          url="https://github.com/omfj"
          logo={<GitHubLogoIcon className={iconClasses} />}
        />
        {/* LinkedIn */}
        <SocialItem
          platform="LinkedIn"
          username="in/omfj"
          url="https://linkedin.com/in/omfj"
          logo={<LinkedInLogoIcon className={iconClasses} />}
        />
        {/* Instagram */}
        <SocialItem
          platform="Instagram"
          username="@lordolem"
          url="https://instagram.com/lordolem"
          logo={<InstagramLogoIcon className={iconClasses} />}
        />
        {/* X */}
        <SocialItem
          platform="X"
          username="@omfj_"
          url="https://x.com/omfj_"
          logo={<XIcon className={iconClasses} />}
        />
      </ul>
    </main>
  );
}
