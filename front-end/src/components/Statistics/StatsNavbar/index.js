import React, {useState} from 'react';
import {NavLink as Link} from 'react-router-dom'
import Spending from '../Spending'
import Balance from '../Balance'
import '../css/StatsNavbar.css'

const StatsNavbar = () => {
    const [isActive, setActive] = useState(false)

    const toggleClass = () => {
        setActive(!isActive)
    }

    return (
        <div className = "statsNavbar">
            <Link
                className={isActive ? "statsNavLinkActive" : "statsNavLink"}
                to="/statistics/spending"
                onClick={toggleClass}
            >
                Spending
            </Link>
            <Link
                className={!isActive ? "statsNavLinkActive" : "statsNavLink"}
                to="/statistics/balance"
                onClick={toggleClass}
            >
                Balance
            </Link>
        </div>
    );
};

export default StatsNavbar;