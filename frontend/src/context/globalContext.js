import React, { useContext, useState } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // Calculate incomes
    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, income);
            await getIncomes();  // Refresh income list after adding
        } catch (err) {
            setError(err.response?.data?.message);
        }
    };

    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`);
            setIncomes(response.data);
            console.log(response.data);
        } catch (err) {
            setError(err.response?.data?.message);
        }
    };

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`);
            await getIncomes();  // Refresh income list after deletion
        } catch (err) {
            setError(err.response?.data?.message);
        }
    };

    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    // Calculate expenses
    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, expense);
            await getExpenses();  // Refresh expense list after adding
        } catch (err) {
            setError(err.response?.data?.message);
        }
    };

    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`);
            setExpenses(response.data);
            console.log(response.data);
        } catch (err) {
            setError(err.response?.data?.message);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`);
            await getExpenses();  // Refresh expense list after deletion
        } catch (err) {
            setError(err.response?.data?.message);
        }
    };

    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
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
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
