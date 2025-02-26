import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthContext.js";
import { LoginWrapper, LoginBox, Title, FormGroup, ErrorMessage, SubmitButton } from './login.js';
import { useDispatch, useDispatch as useReduxDispatch } from "react-redux";
import { loginThunk } from "./features/LoginThunks.js";
import { toast } from "react-toastify";
import { AppDispatch } from '../app/store.js';

export const Login = () => {
    const [email, setEmail] = useState("example@gmail.com");
    const [password, setPassword] = useState("123456");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }
    const { dispatch: authDispatch } = authContext; // Desestructuramos el dispatch del AuthContext

    const dispatch: AppDispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const resultAction = await dispatch(loginThunk({ email, password }));
            if (loginThunk.fulfilled.match(resultAction)) {
                const { token, user } = resultAction.payload;
                authDispatch({ type: "login", payload: { user, token } });
                toast.success("Login successful", {
                    position: "top-right",
                    autoClose: 2000,
                });
                navigate("/");
            } else {
                setError("Invalid credentials");
            }
        } catch (err: any) {
            setError(err.message || "Login failed");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <LoginWrapper>
            <LoginBox>
                <Title>Login</Title>
                <p style={{ textAlign: "center" }}>Use these credentials to log in:</p>
                <p style={{ textAlign: "center" }}>Email: admin@example.com</p>
                <p style={{ textAlign: "center" }}>Password: 123456</p>

                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            data-cy="email-input"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            data-cy="password-input"
                        />
                    </FormGroup>
                    {error && <ErrorMessage data-cy="error-message">{error}</ErrorMessage>}
                    <SubmitButton type="submit" data-cy="login-submit">
                        Login
                    </SubmitButton>
                </form>
            </LoginBox>
        </LoginWrapper>
    );
};
