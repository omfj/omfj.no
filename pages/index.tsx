import { Flex, Heading, Text } from "@chakra-ui/react";
import PageLayout from "@/components/PageLayout";

const HomePage = () => {
  return (
    <PageLayout title="omfj.no" description="My personal website">
      <Flex as="main" direction="column" maxW="2xl" mx="auto" gap="3" px="5">
        <Heading>Hello, WWW 👋🏻</Heading>

        <Text>
          My name is Ole Magnus. Currently I am studying Computer Technology at
          the University of Bergen. I am interested in web development, and I
          have a passion for learning new things.
        </Text>

        <Text>
          I am also a member of echo Webkom at the University of Bergen. Here I
          help develop and maintain the website of echo.
        </Text>

        <Text>
          When I am not at the computer I enjoy playing video games. I also do
          Tennis during the summer and downhill skiing during the winter.
        </Text>

        <Text>
          Wanna read about some of my projects? Check out my projects page.
        </Text>

        <Text>Wanna get in touch? Check out my contact page.</Text>
      </Flex>
    </PageLayout>
  );
};

export default HomePage;
