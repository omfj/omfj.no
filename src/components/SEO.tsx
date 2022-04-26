import Head from "next/head";

interface Props {
  title: string;
  desc?: string;
}

const SEO = ({ title, desc }: Props): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc ? desc : "omfj.no"} />
      <meta
        name="keywords"
        content="omfj, ole magnus, ole magnus fon johnsen, olem"
      />
      <meta name="author" content="Ole Magnus Johnsen <ole.magnus@me.com>" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
};

export default SEO;
