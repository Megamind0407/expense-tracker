import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';

const SignIn = ({onSignIn}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { clearData, setExpenses, setIncomes } = useGlobalContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset the error message

        try {
            const response = await axios.post('http://localhost:5000/api/v1/signin', { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log("Response:", response.data);

            const { token, userId } = response.data;
            localStorage.setItem('token', token);
            clearData();
            await loadUserData(userId);
            onSignIn(); 

        } catch (error) {
            console.error('Sign-in error:', error);

            // Update error handling to cover more cases and provide better feedback
            if (error.response) {
                // Server responded with a status other than 200 range
                setError(error.response.data.message || 'Invalid email or password.');
            } else if (error.request) {
                // Request was made but no response received
                setError('Network error. Please check your connection or try again later.');
            } else {
                // Something else caused an error
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    const loadUserData = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/v1/user/${userId}/data`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update global context with user's data
            setExpenses(response.data.expenses || []);
            setIncomes(response.data.incomes || []);

        } catch (error) {
            console.error('Failed to load user data', error);
            setError('Failed to load user data. Please try again.');
        }
    };

    const handleRegister = () => {
        navigate('/signup');
    };

    return (
        <SignInWrapper>
            <FormContainer>
                <h2>Sign In</h2>
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
                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <SubmitButton type="submit">Sign In</SubmitButton>
                </form>
                <p style={{fontSize: "1rem", marginTop: '1rem'}}>Don't have an account? <RegisterLink onClick={handleRegister}>Register here</RegisterLink></p>
            </FormContainer>
        </SignInWrapper>
    );
};

export default SignIn;

// Styled components (unchanged)
const SignInWrapper = styled.div`
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

const RegisterLink = styled.span`
    color: black;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.9rem;
    margin-top: -1rem;
    margin-bottom: 1rem;
`;
