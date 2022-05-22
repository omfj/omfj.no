import NextLink from "next/link";

interface Props {
  icon: any;
  link: string;
}

const IconLink = ({ icon, link }: Props) => {
  return (
    <NextLink href={link} passHref>
      <a>{icon}</a>
    </NextLink>
  );
};

export default IconLink;
