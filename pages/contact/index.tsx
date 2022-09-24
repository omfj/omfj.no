import { Flex, Text, Link, Heading, Center } from "@chakra-ui/react";
import { FaKeybase } from "react-icons/fa";
import {
  AiOutlineMail,
  AiFillGithub,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import NextLink from "next/link";
import PageLayout from "@/components/PageLayout";
import ContactBox from "@/components/ContactBox";

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/omfj",
    username: "omfj",
    icon: AiFillGithub,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/omfj/",
    username: "omfj",
    icon: AiOutlineLinkedin,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/omfj_",
    username: "omfj_",
    icon: AiOutlineTwitter,
  },
  {
    name: "Email",
    url: "mailto:hei@omfj.no",
    username: "hei@omfj.no",
    icon: AiOutlineMail,
  },
  {
    name: "Keybase",
    url: "https://keybase.io/omfj",
    username: "omfj",
    icon: FaKeybase,
  },
];

const ContactPage = () => {
  return (
    <PageLayout title="Contact" description="Contact me">
      <Flex as="main" direction="column" maxW="2xl" mx="auto" gap="3" px="3">
        <Heading>Contact</Heading>
        <Text>Best ways to get in touch with me. </Text>
        <Flex direction="column" gap="3" mb="3">
          {socials.map((social) => (
            <ContactBox
              key={social.name}
              name={social.name}
              to={social.url}
              username={social.username}
              icon={social.icon}
            />
          ))}
        </Flex>
        <Center flexDirection="column" gap="3">
          <Text>My PGP key ID:</Text>

          <NextLink href="/pgp-key.asc" passHref>
            <Link
              textAlign="center"
              color="blue.400"
              _hover={{ textDecor: "underline" }}
            >
              CA2C 0707 5170 9E32 343F 6D58 A20C 4384 0D84 1F41
            </Link>
          </NextLink>
        </Center>
      </Flex>
    </PageLayout>
  );
};

export default ContactPage;
