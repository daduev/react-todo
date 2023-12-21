import { createContext, useContext, useState, useEffect } from "react";
//import { useUserContext } from "../contexts/UserContext";

const TodoContext = createContext(undefined);

export const TodoProvider = ({ children }) => {
  //const { user } = useUserContext();
  const [todos, setTodos] = useState([]);
  const [isLoading, setLoading] = useState(false);

  /*
  useEffect(() => {
    get();
  }, [isLoading, user.username]);
*/

  const get = async () => {
    const response = await fetch("https://my-local-dev/api/private/todo", {
      credentials: "include",
    });

    if (response.status === 200) {
      const data = await response.json();
      setTodos(data);
    } else {
      setTodos([]);
    }
  };

  const add = async () => {
    setLoading(true);
    let response = await fetch("https://my-local-dev/api/private/todo/add", {
      method: "POST",
      body: JSON.stringify({
        text: null,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    });
    setLoading(false);
  };

  const update = async (id) => {
    setLoading(true);
    let newText = todos.filter((el) => el.id === id)[0].text;

    let response = await fetch(
      `https://my-local-dev/api/private/todo/${id}/edit`,
      {
        method: "PUT",
        body: JSON.stringify({
          text: newText,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      }
    );
    setLoading(false);
  };

  const del = async (id) => {
    setLoading(true);
    let response = await fetch(
      `https://my-local-dev/api/private/todo/${id}/delete`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    /*
    if (response.status === 200) {
      setTodos(current =>
        current.filter(obj => {
          return obj.id !== id;
        }),
      );
    }
    */
    setLoading(false);
  };

  const complete = async (id) => {
    setLoading(true);
    let done = !todos.filter((el) => el.id === id)[0].done;

    let response = await fetch(
      `https://my-local-dev/api/private/todo/${id}/done/${done}`,
      {
        method: "PUT",
        body: JSON.stringify({
          done,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      }
    );
    setLoading(false);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        add,
        update,
        del,
        complete,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
