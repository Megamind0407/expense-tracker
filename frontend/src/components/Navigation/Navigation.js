import React from 'react'
import styled from 'styled-components'
import avatar from '../../assets/avatar.png'
import {menuItems} from '../../utils/menuItems'
import { signout } from '../../utils/Icons'



function Navigation() {
    return (
        <NavStyled>
            <div className='user-con'>
                <img src={avatar} alt=''/>
                <div className='text'>
                    <h2>User</h2>
                    <p>Your Money</p>
                </div>
            </div>
            <ul className='menu-items'>
                {menuItems.map((item) => {
                    return <li
                    key={item.id}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className='bottom-nav'>
                <li>
                    {signout} Sign Out
                </li>
            </div>
        </NavStyled>
    )
}

const NavStyled = styled.nav`


`



export default Navigation