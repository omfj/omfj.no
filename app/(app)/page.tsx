import {PortableText} from "@portabletext/react";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

import {SocialItem} from "@/components/social-item";
import {fetchSiteSettings} from "@/lib/sanity/settings";

export default async function HomePage() {
  const settings = await fetchSiteSettings();

  const iconClasses = "h-8 w-8 text-slate-800";

  return (
    <main className="mx-auto max-w-xl text-center">
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
        {/* Twitter */}
        <SocialItem
          platform="Twitter"
          username="@omfj_"
          url="https://twitter.com/omfj_"
          logo={<TwitterLogoIcon className={iconClasses} />}
        />
      </ul>
    </main>
  );
}
