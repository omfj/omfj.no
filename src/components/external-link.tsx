import NextLink from "next/link";

interface Props {
  title: string;
  link: string;
}

const ExternalLink = ({ title, link }: Props): JSX.Element => (
  <NextLink href={link} passHref>
    <a>
      <div className="rounded bg-gray-900 p-2 hover:cursor-pointer hover:bg-gray-800">
        <p>{title}</p>
      </div>
    </a>
  </NextLink>
);

export default ExternalLink;
