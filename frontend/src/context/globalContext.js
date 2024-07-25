import React, { useContext, useState } from "react";
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/';


const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // Calculate incomes
    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}add-income`, income);
            if (response && response.data) {
                setIncomes([...incomes, response.data]);
                setError(null);
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`);
        setIncomes(response.data)
        console.log(response.data)
    }
    getIncomes();




    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
