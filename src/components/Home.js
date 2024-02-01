import { VStack, Text, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import useTodoRouter from "../hooks/useTodoRouter";

const Home = () => {
  const { user } = useSelector((state) => state?.users);
  const navigate = useTodoRouter();

  const backToList = (e) => {
    navigate("/main");
  };

  return (
    <VStack bg="#456797" paddingTop={100}>
      <Text fontSize="4xl">Welcome to ToDo application</Text>
      {user?.username ? (
        <Button colorScheme="blue" onClick={backToList}>
          Back To List
        </Button>
      ) : (
        <Text fontSize="md">Please loging to start</Text>
      )}
    </VStack>
  );
};

export default Home;
