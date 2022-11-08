import Head from "next/head";

interface Props {
  title: string;
  description: string;
}

const SEO = ({ title, description }: Props) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Head>
);

export default SEO;
