import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignIn from './SignIn';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSignIn] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/signin');
    };

    return (
        <SignUpWrapper>
            {showSignIn ? (
                <SignIn />
            ) : (
                <FormContainer>
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <FormField>
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FormField>
                        <FormField>
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </FormField>
                        <SubmitButton type="submit">Sign Up</SubmitButton>
                    </form>
                </FormContainer>
            )}
        </SignUpWrapper>
    );
};

export default SignUp;

const SignUpWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9f9f9;
`;

const FormContainer = styled.div`
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    text-align: center;

    h2 {
        margin-bottom: 2rem;
        font-size: 2rem;
        color: #333;
    }
`;

const FormField = styled.div`
    margin-bottom: 1.5rem;
    text-align: left;

    label {
        display: block;
        font-size: 1rem;
        color: #555;
        margin-bottom: 0.5rem;
    }

    input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 1rem;
        transition: border 0.3s ease-in-out;

        &:focus {
            border-color: #007bff;
            outline: none;
        }
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: #0056b3;
    }
`;
