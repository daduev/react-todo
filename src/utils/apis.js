const domain = "https://dev-walx.onrender.com";
//const domain = "http://localhost:8080";
const apiPublicPrefix = "api/public";
const apiPrivatePrefix = "api/private";

const apis = {
  userApis: {
    currentUser: `${domain}/${apiPrivatePrefix}/users/current`,
    login: `${domain}/${apiPublicPrefix}/login`,
    logout: `${domain}/api/logout`,
  },
  todoApis: {
    todos: `${domain}/${apiPrivatePrefix}/todos`,
  },
};

export default apis;
