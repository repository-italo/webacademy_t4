"use client";
import { createContext, useContext, useEffect, useState } from "react"

interface IAuthContext {
    emailUser: string | null;
    login: (email: string) => void;
    logout: () => void;
}

interface IAuthProvider {
    children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({
    emailUser: null,
    login: () => {},
    logout: () => {}
});


export const AuthProvider = ({children}: IAuthProvider) => {
    
    const [emailUser, setEmailUser] = useState<string | null>(null);
    useEffect(() => {
        const email = localStorage.getItem("user");
        if(email){
            setEmailUser(email);
        }
    }, []);

    const login = (email: string) => {
        setEmailUser(email);
        localStorage.setItem("user", email);
    };
    const logout = () => {
        const user = localStorage.getItem("user");
        if(user){
            localStorage.removeItem("user");
            setEmailUser(null);
        }
    };

    const value = {emailUser, login, logout};
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
}