import NextLink from "next/link";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

interface Props {
  source: any;
  href: string;
  alt: string;
}

const SocialMediaImg = ({ source, href, alt }: Props): JSX.Element => {
  return (
    <NextLink href={href} passHref>
      <a>
        <Box
          w="125px"
          h="125px"
          m="auto"
          transition="0.5s"
          _hover={{ cursor: "pointer", transform: "scale(1.1)" }}
        >
          <Image src={source} alt={alt} />
        </Box>
      </a>
    </NextLink>
  );
};

export default SocialMediaImg;
