import NextLink from "next/link";
import { Text, Box } from "@chakra-ui/react";

interface Props {
  slug: string;
  color: string;
  emoji: string;
  title: string;
}

const CategoryTag = ({ slug, color, emoji, title }: Props) => {
  return (
    <NextLink href={"/category/" + slug} passHref>
      <a>
        <Text
          bg={color + "33"}
          py="1"
          px="2"
          m="0.5"
          fontSize="0.85rem"
          borderRadius="20"
          border="2px solid transparent"
          w="fit-content"
          _hover={{
            cursor: "pointer",
            borderColor: "#1cc1fcaa",
          }}
        >
          {emoji + " " + title}
        </Text>
      </a>
    </NextLink>
  );
};

export default CategoryTag;
