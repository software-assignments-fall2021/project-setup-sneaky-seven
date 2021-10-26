import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import StatsNavbar from '../StatsNavbar';
import Balance from '../Balance'
import Spending from "../Spending"

const StatsNavbarWrapper = () => {
    return (
        <Router>
            <StatsNavbar/>
            <Switch>
                <Route path='/statistics/balance' exact component={Balance}/>
                <Route path='/statistics/spending' exact component={Spending}/>
            </Switch>
        </Router>
    ) 
}

export default StatsNavbarWrapper