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
import { useState, useCallback } from "react";
import { stringUtils } from "../utils/utils";
import useTodoRouter from "../hooks/useTodoRouter";
import useTodoMessage from "../hooks/useTodoMessage";
import { signupUserAction } from "../redux/slice/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";

const RegNewUser = () => {
  const dispatch = useDispatch();
  const navigate = useTodoRouter();
  const message = useTodoMessage();
  const { loading } = useSelector((state) => {
    return state?.users;
  });
  const [form, setForm] = useState({
    newUsername: "",
    password: "",
    invalid: false,
  });

  const back = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const validationCB = useCallback(() => {
    const usernameInvalid = stringUtils.isTextEmpty(form.newUsername);
    const passwordInvalid =
      stringUtils.isTextEmpty(form.password) || form.password.length <= 3;

    let passValidationMsg = "";
    if (stringUtils.isTextEmpty(form.password)) {
      passValidationMsg = "Password is required";
    } else if (form.password.length <= 3) {
      passValidationMsg = "Password length should not be less then 3";
    }
    return {
      usernameInvalid,
      passwordInvalid,
      passValidationMsg,
    };
  }, [form.newUsername, form.password]);

  const submit = (e) => {
    e.preventDefault();

    const validation = validationCB();
    if (validation.usernameInvalid || validation.passwordInvalid) {
      setForm({ ...form, invalid: true });
      return;
    }

    dispatch(
      signupUserAction({
        username: form.newUsername,
        password: form.password,
      })
    )
      .unwrap()
      .then((payload) => {
        message.showSuccess(200, "OK");
        navigate("/");
      })
      .catch((payload) => {
        message.showError(payload.status, payload.message);
      });
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
              isInvalid={form.invalid && validationCB().usernameInvalid}
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
                    invalid: false,
                  });
                }}
              />
              <FormErrorMessage>Username is required</FormErrorMessage>
            </FormControl>

            <FormControl
              marginTop={5}
              isInvalid={form.invalid && validationCB().passwordInvalid}
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
                    invalid: false,
                  });
                }}
              />
              <FormErrorMessage>
                {validationCB().passValidationMsg}
              </FormErrorMessage>
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
