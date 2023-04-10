import {PortableText} from "@portabletext/react";

import Heading from "@/components/ui/heading";
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
        <Heading as="h1" underline className="mb-4">
          {settings.title}
        </Heading>
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
