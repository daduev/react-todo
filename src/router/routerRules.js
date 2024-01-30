import { createBrowserRouter } from "react-router-dom";
import Main from "../components/Main";
import RegNewUser from "../components/RegNewUser";
import Home from "../components/Home";
import RouterNotFoundError from "../components/RouterNotFoundError";
import Layout from "../components/Layout";

const routerRules = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <RouterNotFoundError />,
    children: [
      {
        errorElement: <RouterNotFoundError />,
        children: [
          { index: true, element: <Home /> },
          {
            path: "/main",
            element: <Main />,
          },
          {
            path: "/main/:groupId",
            element: <Main />,
          },
          {
            path: "/registration",
            element: <RegNewUser />,
          },
        ],
      },
    ],
  },
]);

export default routerRules;
