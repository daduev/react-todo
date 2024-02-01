import { VStack, Text, Button } from "@chakra-ui/react";
import useTodoRouter from "../hooks/useTodoRouter";

const RouterNotFoundError = () => {
  const navigate = useTodoRouter();

  const back = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <VStack bg="#456797" padding={10}>
      <Text fontSize="5xl" color="red.400">
        Page not found
      </Text>
      <Button colorScheme="blue" onClick={back}>
        Back to Home
      </Button>
    </VStack>
  );
};

export default RouterNotFoundError;
