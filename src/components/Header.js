import {
  Flex,
  Box,
  Spacer,
  Heading,
  Text,
  HStack,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUserAction,
  getCurrentUserAction,
} from "../redux/slice/users/usersSlice";
import TaskControl from "./HeaderTaskControl";
import LoginUser from "./LoginUser";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import useTodoRouter from "../hooks/useTodoRouter";

const Header = () => {
  const dispatch = useDispatch();
  const { goToMain, goToHome, goToRegistration } = useTodoRouter();
  const { loading, user } = useSelector((state) => {
    return state?.users;
  });
  const { todoGroup } = useSelector((state) => {
    return state?.todos;
  });

  useEffect(() => {
    dispatch(getCurrentUserAction());
  }, [dispatch]);

  useEffect(() => {
    if (user?.username) {
      goToMain(todoGroup?.id);
    }
  }, [goToMain, todoGroup, user]);

  const logout = () => {
    dispatch(logoutUserAction())
      .unwrap()
      .then(() => goToHome())
      .catch(() => {});
  };

  return (
    <Flex bg="#373737" color="white" alignItems="center">
      <Box p="4">
        <Heading size="lg">ToDo</Heading>
      </Box>

      <Spacer />

      <Box p="4">
        <TaskControl userLoading={loading} user={user} />
      </Box>

      <Spacer />

      <Box p="4">
        <HStack>
          {user?.username ? (
            <HStack alignItems="center">
              <Text fontSize="lg">{user?.username}</Text>
              <IconButton
                onClick={logout}
                variant="link"
                icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
              />
            </HStack>
          ) : (
            <LoginUser loading={loading} />
          )}
          {!user?.username && (
            <Button colorScheme="blue" onClick={() => goToRegistration()}>
              Registration
            </Button>
          )}
        </HStack>
      </Box>
    </Flex>
  );
};

export default Header;
