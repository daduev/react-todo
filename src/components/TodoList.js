import {
  HStack,
  Card,
  Input,
  CardBody,
  IconButton,
  Tooltip,
  Skeleton,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { stringUtils } from "../utils/utils";

export default function TodoList({
  loading,
  todos,
  onChange,
  edit,
  del,
  done,
}) {
  return (
    <>
      {todos.map((todo, index) => (
        <Skeleton key={todo.id} isLoaded={!loading}>
          <Card boxShadow="xl" borderRadius="15" key={todo.id} width="700px">
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
                <Tooltip
                  label={
                    !stringUtils.isTextEmpty(todo.text) && todo?.changed
                      ? "*Save/Edit"
                      : "Save/Edit"
                  }
                  placement="right"
                >
                  <IconButton
                    onClick={() => edit(todo.id)}
                    isDisabled={todo.done || stringUtils.isTextEmpty(todo.text)}
                    icon={<FontAwesomeIcon icon={faEdit} />}
                    style={{
                      border:
                        !stringUtils.isTextEmpty(todo.text) && todo?.changed
                          ? "2px solid green"
                          : "",
                    }}
                  />
                </Tooltip>
                <Tooltip label="Remove" placement="right">
                  <IconButton
                    onClick={() => del(todo.id)}
                    isDisabled={todo.done}
                    icon={<FontAwesomeIcon icon={faTrash} />}
                  />
                </Tooltip>
                <Tooltip label="Complete" placement="right">
                  <IconButton
                    onClick={() => done(todo.id)}
                    isDisabled={stringUtils.isTextEmpty(todo.text)}
                    icon={<FontAwesomeIcon icon={faCheck} />}
                  />
                </Tooltip>
              </HStack>
            </CardBody>
          </Card>
        </Skeleton>
      ))}
    </>
  );
}
