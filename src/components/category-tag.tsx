import NextLink from "next/link";
import { Text } from "@chakra-ui/react";

interface Props {
  slug: string;
  color: string;
  emoji: string;
  title: string;
}

const CategoryTag = ({ slug, color, emoji, title }: Props) => {
  return (
    <NextLink href={"/category/" + slug} passHref>
      <Text
        bg={color + "33"}
        py="1"
        px="3"
        mx="1"
        fontSize="0.85rem"
        borderRadius="20"
        w="fit-content"
        _hover={{
          cursor: "pointer",
        }}
      >
        {emoji} {title}
      </Text>
    </NextLink>
  );
};

export default CategoryTag;
