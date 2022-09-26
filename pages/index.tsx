import { Flex, Heading, Text } from "@chakra-ui/react";
import PageLayout from "@/components/PageLayout";
import path from "path";
import fs from "fs";
import Markdown from "react-markdown";
import matter from "gray-matter";

interface Props {
  title: string;
  content: string;
}

const HomePage = ({ title, content }: Props) => {
  return (
    <PageLayout title="omfj.no" description="My personal website">
      <Flex as="main" direction="column" maxW="2xl" mx="auto" gap="3" px="5">
        <Heading>{title}</Heading>
        <Markdown className="markdown">{content}</Markdown>
      </Flex>
    </PageLayout>
  );
};

const ROOT = process.cwd();
const STATIC_PATH = path.join(ROOT, "public", "static");

export const getStaticProps = () => {
  const filePath = path.join(STATIC_PATH, "index.md");
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);

  return {
    props: {
      title: data.title,
      content,
    },
  };
};

export default HomePage;
