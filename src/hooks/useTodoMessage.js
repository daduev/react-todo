import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useTodoMessage = () => {
  const toast = useToast();
  const duration = 5000;
  const isClosable = true;
  const position = "top-right";

  const showError = useCallback(
    (title, desc) =>
      toast({
        title,
        description: desc,
        status: "error",
        duration,
        isClosable,
        position,
      }),
    [toast, duration, isClosable, position]
  );

  const showSuccess = useCallback(
    (title, desc) =>
      toast({
        title,
        description: desc,
        status: "success",
        duration,
        isClosable,
        position,
      }),
    [toast, duration, isClosable, position]
  );

  return { showError, showSuccess };
};

export default useTodoMessage;
