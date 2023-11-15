import { useState, useEffect, useCallback } from "react";

const useTodoData = () => {
    const [isLoading, setLoading] = useState(false);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        setLoading(true);
        console.log("aaaaaaaaaaa");
        const fetchTodos = async () => {
            const response = await fetch(
                "https://localhost:8443/api/public/todo"
            );
            const data = await response.json();
            setTodos(data);
        };
        fetchTodos();
        setLoading(false)
    }, [isLoading]);

    const update = async (id) => {
        setLoading(true);
        let newText = todos.filter(el => el.id === id)[0].text;

        let response = await fetch(`https://localhost:8443/api/public/todo/${id}/edit`, {
            method: 'PUT',
            body: JSON.stringify({
                text: newText,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        setLoading(false)
    };

    const add = async () => {
        setLoading(true)
        let response = await fetch("https://localhost:8443/api/public/todo/add", {
            method: 'POST',
            body: JSON.stringify({
                text: null
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        setLoading(false)
    };

    return { todos, setTodos, update, add };
}

export default useTodoData;