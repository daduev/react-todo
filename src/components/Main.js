import {
    HStack,
    VStack,
    Card,
    Input,
    CardBody,
    IconButton,
    Tooltip
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useTodoContext } from "../contexts/TodoContext";
import { useUserContext } from "../contexts/UserContext";
//import useTodoData from "../hooks/UseTodoData";

const Main = () => {
    const { todos, setTodos, update, del, complete } = useTodoContext();
    const { user } = useUserContext();
    //const { todos, setTodos, update } = useTodoData();

    const onChange = (id, newText) => {
        setTodos(current =>
            current.map(obj => {
                if (obj.id === id) {
                    return { ...obj, text: newText };
                }
                return obj;
            }),
        );
    };

    return (
        <VStack bg="#2A4365" padding={2}>
            {todos.map((todo, index) => (
                <Card key={todo.id} width="700px">
                    <CardBody>
                        <HStack>
                            {todo.done && <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />}

                            <Input 
                                placeholder="Input todo task..."
                                isReadOnly={todo.done}
                                p={6}
                                value={todo.text || ""}
                                onChange={(e) => {
                                    onChange(todo.id, e.target.value);
                                }} />

                            <Tooltip label='Save/Edit' placement='bottom-end'>
                                <IconButton 
                                    onClick={() => update(todo.id)}
                                    isDisabled={todo.done}
                                    icon={<FontAwesomeIcon icon={faEdit} />} />
                            </Tooltip>
                            <Tooltip label='Remove' placement='bottom-end'>
                                <IconButton 
                                    onClick={() => del(todo.id)}
                                    isDisabled={todo.done}
                                    icon={<FontAwesomeIcon icon={faTrash} />} />
                            </Tooltip>
                            <Tooltip label='Complete' placement='bottom-end'>
                                <IconButton 
                                    onClick={() => complete(todo.id)}
                                    icon={<FontAwesomeIcon icon={faCheck} />} />
                            </Tooltip>

                        </HStack>
                    </CardBody>
                </Card>
            ))}
        </VStack>
    );
}

export default Main;