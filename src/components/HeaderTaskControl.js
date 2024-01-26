import { HStack, Switch, Text } from "@chakra-ui/react";
import AddNewTaskDialog from "./AddNewTaskDialog";
import {
  addTodoAction,
  getTodosAction,
  onChangeHideCompletedAction,
} from "../redux/slice/todos/todoSlice";
import { useSelector, useDispatch } from "react-redux";

export default function TaskControl({ userLoading, user }) {
  const { hideCompleted } = useSelector((state) => state?.todos);
  const dispatch = useDispatch();

  const addTodo = (text) => {
    dispatch(addTodoAction({ text }));
  };

  const onHideCompletedTask = (checked) => {
    dispatch(onChangeHideCompletedAction({ hideCompleted: checked }));
    dispatch(getTodosAction());
  };

  return (
    <HStack>
      <AddNewTaskDialog
        userLoading={userLoading}
        user={user}
        addTodo={addTodo}
      />
      <Text ml={7}>Hide Completed</Text>
      <Switch
        value={hideCompleted}
        isDisabled={!user?.username}
        colorScheme="blue"
        size="lg"
        onChange={(e) => {
          onHideCompletedTask(e.target.checked);
        }}
      />
    </HStack>
  );
}
