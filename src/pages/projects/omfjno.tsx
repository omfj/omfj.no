import Main from "../../components/main";
import SEO from "../../components/SEO";
import { Box, ListItem, Link, List, Text, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import ProjectTitle from "../../components/project-title";

const Checklist = ({
  checked,
  text,
}: {
  checked: boolean;
  text: string;
}): JSX.Element => {
  return (
    <ListItem>
      <Flex>
        <Text mr="2">{checked ? "[x]" : "[ ]"}</Text>
        <Text>{text}</Text>
      </Flex>
    </ListItem>
  );
};

const Omfjno = (): JSX.Element => {
  return (
    <>
      <SEO title="projects - omfj.no" />
      <Main>
        <ProjectTitle title="project - omfj.no" />

        <Box
          flexDir="column"
          m="auto"
          border="2px solid white"
          width="fit-content"
          p="3"
        >
          <Text fontSize="lg" fontWeight="bold" mb="2">
            Roadmap:
          </Text>
          <List my="5" spacing={3}>
            <Checklist
              checked={false}
              text="Navigation drawer for mobile screens."
            />
            <Checklist
              checked={false}
              text="Blog with CMS. Sanity of self hosted."
            />
            <Checklist checked={false} text="Fix navbar buttons" />
            <Checklist
              checked={false}
              text="Pointer when hovering footer logos"
            />
          </List>
        </Box>
        <Box my="5" textAlign="center">
          <Text>The source code is on Github: </Text>
          <NextLink href="https://github.com/omfj/omfj.no/" passHref>
            <Link color="blue.400">Source Code</Link>
          </NextLink>
        </Box>
      </Main>
    </>
  );
};

export default Omfjno;
