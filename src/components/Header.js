import { Flex, Box, Spacer, Heading, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserAction,
  logoutUserAction,
  getCurrentUserAction,
} from "../redux/slice/users/usersSlice";
import { addTodoAction } from "../redux/slice/todos/todoSlice";
import User from "./User";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();

  const { loading, user } = useSelector((state) => {
    return state?.users;
  });

  const cleanUserInput = () => {};

  useEffect(() => {
    dispatch(getCurrentUserAction());
  }, [dispatch]);

  const submit = (formJson) => {
    dispatch(loginUserAction(formJson));
    cleanUserInput();
  };

  const logout = () => {
    dispatch(logoutUserAction());
  };

  const addTodo = () => {
    dispatch(addTodoAction());
  };

  return (
    <Flex backgroundColor="#18181b" color="white" alignItems="center">
      <Box p="4">
        <Heading size="lg">To Do</Heading>
      </Box>

      <Spacer />

      <Box p="4">
        <Button
          colorScheme="blue"
          onClick={() => addTodo()}
          isDisabled={!user?.username}
          isLoading={loading}
        >
          Add New Task
        </Button>
      </Box>

      <Spacer />

      <Box p="4">
        <User
          onSubmit={submit}
          onLogout={logout}
          username={user?.username}
          loading={loading}
          onCleanUserInput={cleanUserInput}
        />
      </Box>
    </Flex>
  );
};

export default Header;
