import { Box, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

interface Props {
  title: string;
  desc: string;
  link: string;
}

const ProjectBox = ({ title, desc, link }: Props): JSX.Element => {
  return (
    <Box my="3" mb="8">
      <Text
        fontWeight="bold"
        fontSize="lg"
        py="2"
        px="4"
        w="fit-content"
        borderBottom="2px solid white"
      >
        {title}
      </Text>
      <Text borderLeft="2px solid white" py="4" px="3">
        {desc}
      </Text>
      <Box border="2px solid white" w="fit-content" p="1">
        <NextLink href={"projects/" + link} passHref>
          <Link p="3">Learn more</Link>
        </NextLink>
      </Box>
    </Box>
  );
};

export default ProjectBox;
