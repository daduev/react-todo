import { VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodosAction,
  onChangeTodosAction,
  editTodoAction,
  deleteTodoAction,
  doneTodoAction,
} from "../redux/slice/todos/todoSlice";
import { useEffect } from "react";
import TodoList from "./TodoList";

const Main = () => {
  const dispatch = useDispatch();
  const { loading, todos } = useSelector((state) => state?.todos);

  useEffect(() => {
    dispatch(getTodosAction());
  }, [dispatch]);

  const onChange = (id, newText) => {
    dispatch(onChangeTodosAction({ id, newText }));
  };

  const edit = (id) => {
    let newText = todos.filter((el) => el.id === id)[0].text;
    dispatch(editTodoAction({ id, newText }));
  };

  const del = (id) => {
    dispatch(deleteTodoAction({ id }));
  };

  const done = (id) => {
    let done = !todos.filter((el) => el.id === id)[0].done;
    dispatch(doneTodoAction({ id, done }));
  };

  return (
    <VStack bg="#456797" padding={3}>
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
