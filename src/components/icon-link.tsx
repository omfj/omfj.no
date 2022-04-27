import { Box, Icon } from "@chakra-ui/react";
import NextLink from "next/link";

interface Props {
  icon: any;
  link: string;
}

const IconLink = ({ icon, link }: Props) => {
  return (
    <NextLink href={link} passHref>
      <Icon className="hover-pointer" fontSize="3xl" mx="2" as={icon} />
    </NextLink>
  );
};

export default IconLink;
