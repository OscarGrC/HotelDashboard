import React, { createContext, useReducer, useEffect, ReactNode, Dispatch } from "react";
import { AuthUser } from "./interfaces/AuthUser";
import { AuthState } from "./interfaces/AuthState";

type AuthAction =
    | { type: "login"; payload: { user: { name: string; email: string }; token: string } }
    | { type: "logout" }
    | { type: "updateUser"; payload: Partial<{ name: string; email: string }> };


interface AuthContextType {
    state: AuthState;
    dispatch: Dispatch<AuthAction>;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: { name: "", email: "" },
    token: ""
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "login":
            return {
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
            };
        case "logout":
            return {
                isAuthenticated: false,
                user: { name: "", email: "" },
                token: "",
            };
        case "updateUser":
            return {
                ...state,
                user: { ...state.user, ...action.payload },
            };
        default:
            return state;
    }
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState, (initial) => {
        const storedState = localStorage.getItem("authState");
        return storedState ? JSON.parse(storedState) : initial;
    });

    useEffect(() => {
        localStorage.setItem("authState", JSON.stringify(state));
    }, [state]);

    useEffect(() => {
        const handleLogout = () => {
            dispatch({ type: "logout" });
        };

        window.addEventListener("logout", handleLogout);
        return () => window.removeEventListener("logout", handleLogout);
    }, [dispatch]);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};