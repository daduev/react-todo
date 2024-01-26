import axios from "axios";
import store from "../redux/store/store";
import { cleanTodoAction } from "../redux/slice/todos/todoSlice";
import { cleanUserAction } from "../redux/slice/users/usersSlice";
import { createStandaloneToast } from "@chakra-ui/react";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.data.status === 403) {
      store.dispatch(cleanTodoAction());
      store.dispatch(cleanUserAction());

      const { toast } = createStandaloneToast();
      toast({
        title: error.response.data.status,
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
    return Promise.reject(error);
  }
);
