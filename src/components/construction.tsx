import { Center, Text } from "@chakra-ui/react";

interface Props {
  title: string;
}

const Construction = ({ title }: Props): JSX.Element => {
  return (
    <div className="construction">
      <Center
        flexDir="column"
        bg="omfj.bg"
        p="10"
        borderRadius="0.5rem"
        border="2px solid black"
      >
        <Text fontSize="2xl">{title}</Text>
        <Text>Hey! You have entered a construction site! Come back later.</Text>
      </Center>
    </div>
  );
};

export default Construction;
