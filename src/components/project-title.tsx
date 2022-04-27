import { Text } from "@chakra-ui/react";

interface Props {
  title: string;
}

const ProjectTitle = ({ title }: Props): JSX.Element => {
  return (
    <Text fontSize="3xl" mb="5" textAlign="center">
      {title}
    </Text>
  );
};

export default ProjectTitle;
