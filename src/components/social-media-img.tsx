import NextLink from "next/link";
import Image from "next/image";
import { Box, Link } from "@chakra-ui/react";

interface Props {
  source: any;
  href: string;
  alt: string;
}

const SocialMediaImg = ({ source, href, alt }: Props): JSX.Element => {
  return (
    <NextLink href={href} passHref>
      <Box w="125px" h="125px" _hover={{ cursor: "pointer" }}>
        <Image src={source} alt={alt} />
      </Box>
    </NextLink>
  );
};

export default SocialMediaImg;
