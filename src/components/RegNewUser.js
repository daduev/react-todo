import {
  VStack,
  Card,
  CardHeader,
  Heading,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { stringUtils } from "../utils/utils";
import useTodoRouter from "../hooks/useTodoRouter";
import useTodoMessage from "../hooks/useTodoMessage";
import { signupUserAction } from "../redux/slice/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";

const RegNewUser = () => {
  const dispatch = useDispatch();
  const { goToHome } = useTodoRouter();
  const message = useTodoMessage();
  const { loading } = useSelector((state) => {
    return state?.users;
  });
  const [form, setForm] = useState({
    newUsername: "",
    password: "",
    touched: false,
  });

  const touched = (e) => {
    e.preventDefault();
    setForm({ ...form, touched: true });
  };

  const back = (e) => {
    e.preventDefault();
    goToHome();
  };

  const submit = (e) => {
    e.preventDefault();
    setForm({ ...form, touched: true });
    if (
      !stringUtils.isTextEmpty(form.newUsername) &&
      !stringUtils.isTextEmpty(form.password)
    ) {
      dispatch(
        signupUserAction({
          username: form.newUsername,
          password: form.password,
        })
      )
        .unwrap()
        .then((payload) => {
          message.showSuccess(200, "OK");
          goToHome();
        })
        .catch((payload) => {
          message.showError(payload.status, payload.message);
        });
    }
  };

  return (
    <VStack bg="#456797" padding={3}>
      <Card width="500px">
        <CardHeader>
          <Heading size="md">Registration</Heading>
        </CardHeader>

        <CardBody>
          <VStack>
            <FormControl
              isInvalid={
                form.touched && stringUtils.isTextEmpty(form.newUsername)
              }
            >
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={form.newUsername}
                placeholder="Type username here"
                name="newUsername"
                autoComplete="off"
                onChange={(e) => {
                  setForm({
                    ...form,
                    newUsername: e.target.value,
                  });
                }}
                onClick={touched}
              />
              <FormErrorMessage>Username is required</FormErrorMessage>
            </FormControl>

            <FormControl
              marginTop={5}
              isInvalid={form.touched && stringUtils.isTextEmpty(form.password)}
            >
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={form.password}
                placeholder="Type password here"
                name="password"
                autoComplete="new-password"
                onChange={(e) => {
                  setForm({
                    ...form,
                    password: e.target.value,
                  });
                }}
                onClick={touched}
              />
              <FormErrorMessage>Password is required</FormErrorMessage>
            </FormControl>

            <HStack justify="right" mt={7} w="100%" spacing={4}>
              <Button colorScheme="blue" onClick={back}>
                Back
              </Button>
              <Button isLoading={loading} colorScheme="blue" onClick={submit}>
                Registrate
              </Button>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default RegNewUser;
