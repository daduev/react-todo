import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { RouterProvider } from "react-router-dom";
import routerRules from "./router/routerRules";
import { createStandaloneToast } from "@chakra-ui/react";

function App() {
  const { ToastContainer } = createStandaloneToast();
  return (
    <ChakraProvider>
      <Provider store={store}>
        <RouterProvider router={routerRules} />
        <ToastContainer />
      </Provider>
    </ChakraProvider>
  );
}
export default App;
