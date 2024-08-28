import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form';

function Income() {
    const {addIncome,incomes,getIncomes} = useGlobalContext()

    useEffect(() => {
        getIncomes()
    }, [])

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <div className='income-content'>
                    <div className='form-container'>
                        <Form/>
                    </div>
                    <div className='incomes'>
                        {incomes.map((income) => {
                            const {id, title, amount, date, category, description } = income;
                            return <Income></Income>
                        })}
                    </div>
                    
                </div>
            </InnerLayout>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`

`;


export default Income