import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import Main from "./components/Main";
import { Provider } from "react-redux";
import store from "./redux/store/store";

function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Header />
        <Main />
      </Provider>
    </ChakraProvider>
  );
}
export default App;
