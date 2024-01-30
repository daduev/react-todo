import { VStack, Container, HStack, Button, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodosAction,
  onChangeTodosAction,
  editTodoAction,
  deleteTodoAction,
  doneTodoAction,
  onChangeTodoGroupAction,
} from "../redux/slice/todos/todoSlice";
import { useEffect } from "react";
import TodoList from "./TodoList";
import { useParams } from "react-router-dom";

const Main = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const { loading, todos, todoGroups, todoGroup } = useSelector(
    (state) => state?.todos
  );

  useEffect(() => {
    if (groupId) {
      dispatch(getTodosAction({ groupId }));
    }
  }, [dispatch, groupId]);

  const onChange = (id, newText) => {
    dispatch(onChangeTodosAction({ id, newText }));
  };

  const edit = (id) => {
    let newText = todos.filter((el) => el.id === id)[0].text;
    dispatch(editTodoAction({ id, newText, groupId }));
  };

  const del = (id) => {
    dispatch(deleteTodoAction({ id, groupId }));
  };

  const done = (id) => {
    let done = !todos.filter((el) => el.id === id)[0].done;
    dispatch(doneTodoAction({ id, done, groupId }));
  };

  const prev = () => {};

  const next = () => {
    let index = todoGroups.findIndex((g) => g.id === Number(groupId));
    if (index !== -1) {
      dispatch(onChangeTodoGroupAction(++index));
    }
  };

  return (
    <VStack bg="#456797" padding={3}>
      <HStack>
        <Button onClick={prev}>Down</Button>
        <Text>List</Text>
        <Button onClick={next}>Up</Button>
      </HStack>

      <TodoList
        loading={loading}
        todos={todos}
        onChange={onChange}
        edit={edit}
        del={del}
        done={done}
      />
    </VStack>
  );
};

export default Main;
