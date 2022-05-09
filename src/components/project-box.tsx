import { Box, Flex, Link, LinkOverlay, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { Category } from "../sanity/types";
import CategoryTag from "./category-tag";

interface Props {
  title: string;
  desc: string;
  link: string;
  categories: Array<Category>;
}

const ProjectBox = ({ title, desc, link, categories }: Props): JSX.Element => {
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
      <VStack align="left" borderLeft="2px solid white" py="4" px="3">
        <Text>{desc}</Text>
        <Flex>
          {categories.map((category: Category) => (
            <CategoryTag
              key={category._id}
              slug={category.slug}
              color={category.color ?? "transparent"}
              emoji={category.emoji ?? ""}
              title={category.title}
            />
          ))}
        </Flex>
      </VStack>
      <Box border="2px solid white" w="fit-content" p="2">
        <NextLink href={"projects/" + link} passHref>
          <Link p="3">Learn more</Link>
        </NextLink>
      </Box>
    </Box>
  );
};

export default ProjectBox;
