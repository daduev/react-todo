import { useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Input,
  Button,
} from "@chakra-ui/react";
import { stringUtils } from "../utils/utils";

export default function AddNewTaskDialog({ loading, user, addTodo }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef(null);
  const [text, setText] = useState("");

  return (
    <>
      <Button
        onClick={() => {
          onOpen();
          setText("");
        }}
        colorScheme="blue"
        isDisabled={!user?.username}
        isLoading={loading}
      >
        Add New Task
      </Button>
      <AlertDialog
        leastDestructiveRef={inputRef}
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="scale"
      >
        <AlertDialogOverlay />

        <AlertDialogContent maxW="600px">
          <AlertDialogHeader>Add New Task</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Input
              placeholder="Type your todo task..."
              ref={inputRef}
              onChange={(e) => setText(e.target.value)}
            />
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="red" onClick={onClose}>
              Canclel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                addTodo(text);
                onClose();
              }}
              ml={10}
              isDisabled={stringUtils.isTextEmpty(text)}
            >
              Add
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
