import { Link } from "react-router-dom";
import { VStack } from "@chakra-ui/react";

const RouterNotFoundError = () => {
  return (
    <VStack bg="#456797" padding={3}>
      <h1>Page not found</h1>
      <Link to="/">Back to Home</Link>
    </VStack>
  );
};

export default RouterNotFoundError;
