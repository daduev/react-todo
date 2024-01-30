import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  VStack,
  Input,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../redux/slice/users/usersSlice";

const LoginUser = ({ loading }) => {
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());

    dispatch(loginUserAction(formJson));
  };

  return (
    <VStack>
      <Popover isLazy>
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <Button isLoading={loading} colorScheme="blue">
                Login
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Box p="4" color="black">
                <VStack>
                  <form onSubmit={submit}>
                    <Input placeholder="Username" name="username" />
                    <Input
                      placeholder="Password"
                      type="password"
                      name="password"
                    />
                    <Button
                      type="submit"
                      width="100%"
                      colorScheme="blue"
                      onClick={onClose}
                    >
                      Login
                    </Button>
                  </form>
                </VStack>
              </Box>
            </PopoverContent>
          </>
        )}
      </Popover>
    </VStack>
  );
};

export default LoginUser;
