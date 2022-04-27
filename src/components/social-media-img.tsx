import NextLink from "next/link";
import Image from "next/image";
import { Box, Link } from "@chakra-ui/react";
import { cursorTo } from "readline";
import { transform } from "framer-motion";

interface Props {
  source: any;
  height: number;
  width: number;
  href: string;
  alt: string;
}

const SocialMediaImg = ({
  source,
  height,
  width,
  href,
  alt,
}: Props): JSX.Element => {
  return (
    <NextLink href={href} passHref>
      <Link className="social-media-image" p="10">
        <Image
          className="social-media-image-props"
          src={source}
          height={height}
          width={width}
          alt={alt}
        />
      </Link>
    </NextLink>
  );
};

export default SocialMediaImg;
