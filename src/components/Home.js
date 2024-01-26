import { VStack, Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <VStack bg="#456797" paddingTop={100}>
      <Text fontSize="4xl">Welcome to ToDo application</Text>
      <Text fontSize="md">Please loging to start</Text>
    </VStack>
  );
};

export default Home;
