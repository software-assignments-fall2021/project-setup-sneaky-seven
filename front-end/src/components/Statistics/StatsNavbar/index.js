import React from 'react';
import {
    StatsNav,
    StatsNavLink,
    StatsBars,
    StatsNavMenu,
} from './NavbarElements';

const StatsNavbar = () => {
    return (
        <>
            <StatsNav>
                <StatsBars />
                <StatsNavMenu>
                    <StatsNavLink to='/statistics/balance' activeStyle>
                        Balance
                    </StatsNavLink>
                    <StatsNavLink to='/statistics/spending' activeStyle>
                        Spending
                    </StatsNavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </StatsNavMenu>
            </StatsNav>
        </>
    );
};

export default StatsNavbar;