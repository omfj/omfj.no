import Main from "../../components/main";
import SEO from "../../components/SEO";
import t from "../../static/english.json";
import { Center, Heading, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import SocialMediaImg from "../../components/social-media-img";
import GithubImage from "../../../public/images/github.png";
import LinkedinImage from "../../../public/images/linkedin.png";

const Contact = (): JSX.Element => (
  <>
    <SEO title="contact" />
    <Main>
      <Heading textAlign="center">{t.contact.title}</Heading>
      <Text textAlign="center" fontSize={["md", "lg"]}>
        {t.contact.text}
      </Text>
      <SimpleGrid columns={2} maxW="400px" m="auto" my="10">
        <SocialMediaImg
          source={GithubImage}
          href="https://github.com/omfj"
          alt="Github logo with link to my github."
        />
        <SocialMediaImg
          source={LinkedinImage}
          href="https://linkedin.com/in/omfj"
          alt="Linkedin logo with link to my linkedin"
        />
      </SimpleGrid>
    </Main>
  </>
);

export default Contact;
