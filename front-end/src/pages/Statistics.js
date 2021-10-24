import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../components/Statistics/Navbar";
import Balance from "../components/Statistics/Balance"
import Spending from "../components/Statistics/Spending"

function Statistics() {
    return (
        <div>
            <h1>Statistics</h1>
            <Router>
                <Navbar>
                    <Switch>
                        <Route path='/statistics/balance' component={Balance}/>
                        <Route path='/statistics/spending' component={Spending}/>
                    </Switch>
                </Navbar>
            </Router>
        </div>
    )
}

export default Statistics
