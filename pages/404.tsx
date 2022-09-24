import { Center, Heading, Text } from "@chakra-ui/react";
import PageLayout from "@/components/PageLayout";

const ErrorPage = () => {
  return (
    <PageLayout title="Error 404" description="Error 404">
      <Center as="main" flexDirection="column" maxW="2xl" mx="auto" gap="3">
        <Heading>Her gikk noe galt.</Heading>
        <Text fontSize="6xl">404</Text>
      </Center>
    </PageLayout>
  );
};

export default ErrorPage;
