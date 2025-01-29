import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../login/AuthContext.jsx";
import { LoginWrapper, LoginBox, Title, FormGroup, ErrorMessage, SubmitButton } from './login';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const handleLogin = () => {
        const hardcodedEmail = 'admin@example.com';
        const hardcodedPassword = '123456';

        if (email === hardcodedEmail && password === hardcodedPassword) {
            dispatch({
                type: 'login',
                payload: { name: 'Oscar Gracia', email: hardcodedEmail },
            });
            navigate('/');
        } else {
            setError('Invalid email or password');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <LoginWrapper>
            <LoginBox>
                <Title>Login</Title>
                <p style={{ textAlign: 'center' }}>Use this credentials to log in:</p>
                <p style={{ textAlign: 'center' }}>Email: admin@example.com</p>
                <p style={{ textAlign: 'center' }}>Password: 123456</p>

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
                    <SubmitButton type="submit" onClick={handleLogin} data-cy="login-submit">Login</SubmitButton>
                </form>
            </LoginBox>
        </LoginWrapper>
    );
};
