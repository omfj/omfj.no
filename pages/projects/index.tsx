import {
  Divider,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import PageLayout from "@/components/PageLayout";
import { getProjectsData, StaticMeta } from "@/utils/projects";
import NextLink from "next/link";

interface StaticMetaSlug extends StaticMeta {
  slug: string;
}

interface Props {
  data: Array<StaticMetaSlug>;
}

const ProjectsPage = ({ data }: Props) => {
  return (
    <PageLayout title="Projects" description="Some of my projects">
      <Flex as="main" direction="column" maxW="2xl" mx="auto" gap="3" px="5">
        <Heading>Projects</Heading>
        <Text>Some of my projects</Text>
        <Divider />
        <Flex direction="column" gap="5">
          {data.map((item) => (
            <NextLink key={item.title} href={`/project/${item.slug}`}>
              <Flex
                direction="column"
                gap="3"
                p="3"
                borderRadius="lg"
                transition="0.2s ease-in-out"
                backdropFilter="auto"
                _hover={{ cursor: "pointer", backdropContrast: "0.9" }}
              >
                <Text fontWeight="semibold" fontSize="2xl">
                  {item.title}
                </Text>
                <Text variant="subtle">{item.description}</Text>
                <Text variant="highlight">Read</Text>
              </Flex>
            </NextLink>
          ))}
        </Flex>
      </Flex>
    </PageLayout>
  );
};

export const getStaticProps = async () => {
  const data = await getProjectsData();

  return {
    props: {
      data,
    },
  };
};

export default ProjectsPage;
