import {
  Flex,
  Box,
  Spacer,
  Heading,
  Text,
  HStack,
  IconButton,
  Button,
  Tooltip,
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
import {
  faArrowRightFromBracket,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import useTodoRouter from "../hooks/useTodoRouter";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useTodoRouter();
  const location = useLocation();

  const { loading, user } = useSelector((state) => {
    return state?.users;
  });

  useEffect(() => {
    const currentPage = location.pathname;
    if (currentPage !== "/registration" && currentPage !== "/about") {
      dispatch(getCurrentUserAction());
    }
  }, [dispatch, location]);

  const logout = () => {
    dispatch(logoutUserAction())
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {});
  };

  return (
    <Flex bg="#373737" color="white" alignItems="center">
      <Box p="4">
        <Heading size="lg">
          ToDo
          <sup>
            <Tooltip
              label="About"
              bg="gray.300"
              color="black"
              placement="right"
            >
              <Link to="/about">
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  style={{ color: "#ffffff" }}
                />
              </Link>
            </Tooltip>
          </sup>
        </Heading>
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
            <Button
              colorScheme="blue"
              onClick={() => navigate("/registration")}
            >
              Registration
            </Button>
          )}
        </HStack>
      </Box>
    </Flex>
  );
};

export default Header;
