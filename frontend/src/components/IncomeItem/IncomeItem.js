import React from 'react'
import styled from 'styled-components'
import { calender, comment, dollar, trash } from '../../utils/Icons';
import Button from '../Button/Button';

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description, 
    deleteItem,
    indicatorColor,
    type
}) {
    return (
        <IncomeItemStyled>
            <div className='icon'>

            </div>
            <div className='content'>
                <h5>{title}</h5>
                <div className='inner-content'>
                    <div className='text'>
                        <p>{dollar} 45</p>
                        <p>{calender} {date}</p>
                        <p>
                            {comment}
                            {description}
                        </p>
                    </div>
                    <div className='btn-con'>
                        <Button 
                            icon= {trash}
                            bPad = {'1rem'}
                            bRad = {'50%'}
                            bg = {'var(--primary-color)'}
                            color = {'#fff'}
                            iColor = {'#fff'}
                            hColor = {'var(--color-green)'}
                            
                            />
                    </div>
                </div>
            </div>
        </IncomeItemStyled>
    )
}
const IncomeItemStyled = styled.div`


`;
export default IncomeItem