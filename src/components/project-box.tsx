import { Box, Flex, Text, VStack } from "@chakra-ui/react";
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
    <Box my="4">
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
        <Flex flexWrap="wrap">
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
      <NextLink href={"/projects/" + link} passHref>
        <Box
          border="2px solid white"
          w="fit-content"
          px="3"
          py="2"
          _hover={{ cursor: "pointer" }}
        >
          Learn more
        </Box>
      </NextLink>
    </Box>
  );
};

export default ProjectBox;
