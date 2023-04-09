import {PortableText} from "@portabletext/react";

import Title from "@/components/title";
import MainLayout from "@/layouts/main-layout";
import {SiteSettings, fetchSiteSettings} from "@/lib/sanity/settings";
import {isErrorMessage} from "@/utils/error";

type Props = {
  settings: SiteSettings;
};

export default function HomePage({settings}: Props) {
  return (
    <MainLayout>
      <div className="mx-auto max-w-xl px-3 text-center">
        <Title className="mb-4">{settings.title}</Title>
        <PortableText value={settings.description} />
      </div>
    </MainLayout>
  );
}

export const getStaticProps = async () => {
  const settings = await fetchSiteSettings();
  if (isErrorMessage(settings)) {
    throw new Error("Failed to fetch site settings");
  }

  return {
    props: {
      settings,
    },
  };
};
