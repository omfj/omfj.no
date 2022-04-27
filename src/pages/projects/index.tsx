import Main from "../../components/main";
import SEO from "../../components/SEO";
import { Box, Text } from "@chakra-ui/react";
import ProjectBox from "../../components/project-box";

const Projects = (): JSX.Element => {
  return (
    <>
      <SEO title="projects" />
      <Main>
        <Text textAlign="center" fontSize="3xl">
          Projects
        </Text>
        <Box px="3" py="5">
          <ProjectBox
            title="AppWash CLI"
            link="projects/appwash-cli"
            desc="A CLI for the washing machines at my dorm. There are several versions of this code, written for different systems and in different languages."
          />
          <ProjectBox
            title="omfj.no"
            link="projects/omfjno"
            desc="My own personal website is something that I have been working on for many years now. It started with HTML and CSS, then it was PHP, and now I am using NextJS with Chakra UI."
          />
          <ProjectBox
            title="echo Webkom"
            link="https://github.com/echo-webkom/"
            desc="I am also apart of the webkom-team at UiB. Here I help with maintaing the website for echo, the student association for informatics at UiB. Here I have learned a lot of javascript from people who are smarter than me."
          />
          <ProjectBox
            title="@trondheimvaeret"
            link="projects/trondheimvaeret"
            desc="A twitter bot I made the regulary tweets the temperature in my home city, Trondheim. Not really useful, not really cool, but it was a fun project. Currently it is not running. Why? The spam."
          />
          <ProjectBox
            title="Team Local Tactics"
            link="https://github.com/omfj/team-local-tactics"
            desc="A mandatory assignment for INF142 (Computer Networks) at UiB. It runs on three scripts, a client, a server and a database. The goal was to make a game with the three scripts communicating. It is basically a rock-paper-scissors game with characters. And heavily inspired by League of Legends (my profs idea, not mine)."
          />
        </Box>
      </Main>
    </>
  );
};

export default Projects;
