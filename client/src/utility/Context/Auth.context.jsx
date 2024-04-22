import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export default function useAuthContext() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
}
