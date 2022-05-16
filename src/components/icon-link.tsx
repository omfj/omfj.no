import { Icon } from "@chakra-ui/react";
import NextLink from "next/link";

interface Props {
  icon: any;
  link: string;
}

const IconLink = ({ icon, link }: Props) => {
  return (
    <NextLink href={link} passHref>
      <a>
        <Icon as={icon} fontSize="3xl" mx="2" _hover={{ cursor: "pointer" }} />
      </a>
    </NextLink>
  );
};

export default IconLink;
