import Main from "../../components/main";
import SEO from "../../components/SEO";
import t from "../../static/english.json";
import { Center, Spacer, Text } from "@chakra-ui/react";
import SocialMediaImg from "../../components/social-media-img";
import GithubImage from "../../../public/images/github.png";
import LinkedinImage from "../../../public/images/linkedin.png";

const Contact = (): JSX.Element => {
  const size = 125;

  return (
    <>
      <SEO title="contact" />
      <Main>
        <Text textAlign="center" fontSize="3xl">
          {t.contact.title}
        </Text>
        <Text textAlign="center" fontSize={["md", "lg"]}>
          {t.contact.text}
        </Text>
        <Center maxW="400px" m="auto" my="10">
          <SocialMediaImg
            source={GithubImage}
            height={size}
            width={size}
            href="https://github.com/omfj"
            alt="Github logo with link to my github."
          />
          <Spacer />
          {/* <SocialMediaImg
										source={InstaImage}
										height={100}
										width={100}
										href="https://instagram.com/lordolem"
										alt="Instagram logo with link to my instagram"
								/> */}
          <SocialMediaImg
            source={LinkedinImage}
            height={size}
            width={size}
            href="https://linkedin.com/in/omfj"
            alt="Linkedin logo with link to my linkedin"
          />
        </Center>
      </Main>
    </>
  );
};

export default Contact;
