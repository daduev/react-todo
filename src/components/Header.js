import {
    Flex,
    Box,
    Spacer,
    Heading,
    Button
} from "@chakra-ui/react";
import { useTodoContext } from "../contexts/TodoContext";
import { useUserContext } from "../contexts/UserContext";
import User from "./User"
//import useTodoData from "../hooks/UseTodoData";

const Header = () => {
    const { user, login, logout } = useUserContext();
    const { add } = useTodoContext();
    //const { add } = useTodoData();

    const cleanUserInput = () => {

    };

    const submit = (formJson) => {
        login(formJson);
        cleanUserInput();
    };

    return (
        <Flex backgroundColor="#18181b" color="white" alignItems='center'>
            <Box p="4">
                <Heading size="lg">To Do</Heading>
            </Box>

            <Spacer />

            <Box p="4">
                <Button colorScheme='blue' onClick={() => add()} isDisabled={!user.username}>Add New Task</Button>
            </Box>

            <Spacer />

            <Box p="4">
                <User
                    onSubmit={submit}
                    onLogout={logout}
                    username={user.username}
                    onCleanUserInput={cleanUserInput} />
            </Box>
        </Flex>
    )
};

export default Header;