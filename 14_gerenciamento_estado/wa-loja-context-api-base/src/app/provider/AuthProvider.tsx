import { createContext, useContext } from "react"

interface IAuthContext {
    email: string | null;
    login: () => void;
    logout: () => void;
}

interface IAuthProvider {
    children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({
    email: null,
    login: () => {},
    logout: () => {}
});


export const AuthProvider = ({children}: IAuthProvider) => {
    const email = "testej@gmail.com";
    const login = () => {

    };
    const logout = () => {

    };
    const value = {email, login, logout};
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