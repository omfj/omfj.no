import PageLayout from "@/components/PageLayout";
import {
  Divider,
  Flex,
  Heading,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { getProjectBySlug, getProjectSlugs, StaticMeta } from "utils/projects";
import Markdown from "react-markdown";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

interface Props {
  data: StaticMeta;
  content: string;
}

const ProjectPage = ({ data, content }: Props) => {
  const bgDivider = useColorModeValue("#eee", "#222");

  return (
    <PageLayout title={data.title} description={data.description}>
      <Flex as="main" direction="column" maxW="2xl" mx="auto" gap="3" px="5">
        <Heading>{data.title}</Heading>
        <Text>Last updated: {new Date(data.date).toLocaleDateString()}</Text>
        {data.tags && (
          <Flex direction="row" gap="2">
            {data.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Flex>
        )}
        <Divider bg={bgDivider} />
        <Markdown className="markdown">{content}</Markdown>
      </Flex>
    </PageLayout>
  );
};

export const getStaticPaths = async () => {
  const paths = await getProjectSlugs();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: Params }) => {
  const { data, content } = await getProjectBySlug(params.slug);

  return {
    props: {
      data,
      content,
    },
  };
};

export default ProjectPage;
