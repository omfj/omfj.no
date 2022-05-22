import NextLink from "next/link";
import Image from "next/image";

interface Props {
  source: any;
  href: string;
  alt: string;
}

const SocialMediaImg = ({ source, href, alt }: Props): JSX.Element => {
  return (
    <NextLink href={href} passHref>
      <a>
        <div className="w-[125px] h-[125px] m-auto transition-all hover:curosr-pointer hover:scale-110">
          <Image src={source} alt={alt} />
        </div>
      </a>
    </NextLink>
  );
};

export default SocialMediaImg;
