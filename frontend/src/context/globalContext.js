import React, { useContext, useState } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    const clearData = () => {
        setIncomes([]);
        setExpenses([]);
    };

    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, income);
            await getIncomes();  // Refresh income list after adding
        } catch (err) {
            setError(err.response?.data?.message);
        }
    };

    // Get all Incomes
    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is sent in headers
                },
            });
            setIncomes(response.data);
        } catch (err) {
            setError(err.response?.data?.message);
        }
    };

    // Delete Income
    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is sent in headers
                },
            });
            await getIncomes();  // Refresh income list after deletion
        } catch (err) {
            setError(err.response?.data?.message);
        }
    };

    // Total Income
    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    // Add Expense
    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, expense);
            await getExpenses();  // Refresh expense list after adding
        } catch (err) {
            setError(err.response?.data?.message);
        }
    };

    // Get all Expenses
    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is sent in headers
                },
            });
            setExpenses(response.data);
        } catch (err) {
            setError(err.response?.data?.message);
        }
    };

    // Delete Expense
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is sent in headers
                },
            });
            await getExpenses();  // Refresh expense list after deletion
        } catch (err) {
            setError(err.response?.data?.message);
        }
    };

    // Total Expenses
    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    // Total Balance (Income - Expenses)
    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    // Transaction History (Recent Transactions)
    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3); // Return the 3 most recent transactions
    };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            clearData,   // Include clearData function
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom Hook to use Global Context
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
