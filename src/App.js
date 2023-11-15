import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import Main from "./components/Main";
import { TodoProvider } from "./contexts/TodoContext";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <ChakraProvider>
      <UserProvider>
        <TodoProvider>
          <Header />
          <Main />
        </TodoProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
