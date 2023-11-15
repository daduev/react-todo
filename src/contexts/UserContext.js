import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const getCurrentUser = async () => {
            const response = await fetch(
                "https://my-local-dev/api/private/currentUser",
                {
                    credentials: "include",
                }
            );
            if (response.status === 200) {
                const data = await response.json();
                if (data.username) {
                    setUser({ username: data.username });
                }
            }
        };
        getCurrentUser();
    }, [user.username]);

    const login = async (formData) => {
        let response = await fetch("https://my-local-dev/api/public/login", {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify({
                username: formData.username,
                password: formData.password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response.status === 200) {
            let data = await response.json();
            setUser({ username: data.username });
        }
    };

    const logout = async() => {
        let response = await fetch("https://my-local-dev/api/public/logout", {
            method: 'POST',
            credentials: "include",
        });

        if (response.status === 200) {
            setUser({});
        }
    }

    return (
        <UserContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);