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
    </Head>
  );
};

export default SEO;
