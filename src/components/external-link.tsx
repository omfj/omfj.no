import { Box, Text } from "@chakra-ui/react";
import NextLink from "next/link";

interface Props {
  title: string;
  link: string;
}

const ExternalLink = ({ title, link }: Props): JSX.Element => (
  <NextLink href={link} passHref>
    <a>
      <Box
        borderRadius="0.5rem"
        bg="gray.900"
        p="2"
        _hover={{ cursor: "pointer", bg: "gray.800" }}
      >
        <Text>{title}</Text>
      </Box>
    </a>
  </NextLink>
);

export default ExternalLink;
