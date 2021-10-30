import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import StatsNavbar from '../StatsNavbar';
import Balance from '../Balance'
import Spending from "../Spending"

const StatsNavbarWrapper = ({data}) => {
    return (
        <Router>
            <StatsNavbar/>
            <Switch>
                <Route
                    path='/statistics/spending'
                    exact component={() => <Spending data={data}/>}
                />
                <Route
                    path='/statistics/balance'
                    exact component={() => <Balance data={data}/>}
                />
            </Switch>
        </Router>
    ) 
}

export default StatsNavbarWrapper