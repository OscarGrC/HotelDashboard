import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginWrapper, LoginBox, Title, FormGroup, ErrorMessage, SubmitButton } from './login';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const hardcodedEmail = 'admin@example.com';
        const hardcodedPassword = '123456';

        if (email === hardcodedEmail && password === hardcodedPassword) {
            localStorage.setItem('isAuthenticated', 'true');
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
                <p style={{ textAlign: 'center' }}>Use the following credentials to log in:</p>
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
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </FormGroup>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <SubmitButton type="submit" onClick={handleLogin}>Login</SubmitButton>
                </form>
            </LoginBox>
        </LoginWrapper>
    );
};
