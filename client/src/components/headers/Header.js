import React, {useState, useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import {Link} from 'react-router-dom'
import './Header.css'

const Header = () => {
    const value = useContext(GlobalState)
    return (
        
        <header>
            <div className = "menu">
                <img src = {Menu} alt= "" width = "30"/>
            </div>
            <div className = "logo">
                <h1>
                    <Link to = "/">Fran Shopping Cart</Link>
                </h1>
            </div>

            <ul>
                <li><Link to = "/">Productos</Link></li>
                <li><Link to = "/login">Registrate</Link></li>

                <li>
                    <img src = {Close} alt = "" width = "30" className = "menu" />
                </li>

            </ul>

            <div className = "cart-icon">
                <span>0</span>
                <Link to = "/cart">
                    <img src = {Cart} alt = "" width = "30"/> 
                </Link>
            </div>
        </header>
    )
}

export default Header
