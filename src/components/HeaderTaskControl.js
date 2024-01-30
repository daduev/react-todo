import { Button, HStack, Switch, Text } from "@chakra-ui/react";
import AddNewTaskDialog from "./AddNewTaskDialog";
import {
  addTodoAction,
  getTodosAction,
  onChangeHideCompletedAction,
  addTodoGroupAction,
} from "../redux/slice/todos/todoSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function TaskControl({ userLoading, user }) {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const { hideCompleted, loading } = useSelector((state) => state?.todos);

  const addTodo = (text) => {
    dispatch(addTodoAction({ groupId, text }));
  };

  const onHideCompletedTask = (checked) => {
    dispatch(onChangeHideCompletedAction({ hideCompleted: checked }));
    dispatch(getTodosAction({ groupId }));
  };

  const addGroup = () => {
    dispatch(addTodoGroupAction());
  };

  return (
    <HStack>
      <Button
        isDisabled={!user?.username}
        isLoading={userLoading || loading}
        colorScheme="blue"
        onClick={addGroup}
      >
        +
      </Button>
      <AddNewTaskDialog
        loading={userLoading || loading}
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
