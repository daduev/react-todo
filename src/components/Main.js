import {
  HStack,
  VStack,
  Card,
  Input,
  CardBody,
  IconButton,
  Tooltip,
  Skeleton,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodosAction,
  onChangeTodosAction,
  editTodoAction,
  deleteTodoAction,
  doneTodoAction,
} from "../redux/slice/todos/todoSlice";
import { useEffect } from "react";

const Main = () => {
  const dispatch = useDispatch();

  const { loading, todos } = useSelector((state) => {
    return state?.todos;
  });

  useEffect(() => {
    dispatch(getTodosAction());
  }, [dispatch]);

  const onChange = (id, newText) => {
    dispatch(onChangeTodosAction({ id, newText }));
    console.log("loading=", loading);
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
    <VStack bg="#2A4365" padding={2}>
      {todos.map((todo, index) => (
        <Skeleton key={todo.id} isLoaded={!loading}>
          <Card key={todo.id} width="700px">
            <CardBody>
              <HStack>
                {todo.done && (
                  <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
                )}

                <Input
                  placeholder="Input todo task..."
                  isReadOnly={todo.done}
                  p={6}
                  value={todo.text || ""}
                  onChange={(e) => {
                    onChange(todo.id, e.target.value);
                  }}
                />

                <Tooltip label="Save/Edit" placement="bottom-end">
                  <IconButton
                    onClick={() => edit(todo.id)}
                    isDisabled={todo.done}
                    icon={<FontAwesomeIcon icon={faEdit} />}
                  />
                </Tooltip>
                <Tooltip label="Remove" placement="bottom-end">
                  <IconButton
                    onClick={() => del(todo.id)}
                    isDisabled={todo.done}
                    icon={<FontAwesomeIcon icon={faTrash} />}
                  />
                </Tooltip>
                <Tooltip label="Complete" placement="bottom-end">
                  <IconButton
                    onClick={() => done(todo.id)}
                    icon={<FontAwesomeIcon icon={faCheck} />}
                  />
                </Tooltip>
              </HStack>
            </CardBody>
          </Card>
        </Skeleton>
      ))}
    </VStack>
  );
};

export default Main;
