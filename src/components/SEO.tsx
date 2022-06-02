import Head from "next/head";

interface Props {
  title: string;
  author?: string;
  desc?: string;
}

const SEO = ({ title, author, desc }: Props): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="author"
        content={author ?? "Ole Magnus Fon Johnsen <hei@omfj.no>"}
      />
      <meta name="description" content={desc ?? "omfj.no"} />
    </Head>
  );
};

export default SEO;
