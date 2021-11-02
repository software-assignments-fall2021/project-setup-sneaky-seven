import React, { useState, useEffect } from "react";
import api from "../api"
import StatsNavbarWrapper from '../components/Statistics/StatsNavbar/StatsNavbarWrapper'


const Statistics = () => {
    const [transactions, setTransactions] = useState();
    useEffect(() => {
        (async () => {
            const result = await api.getAllTransactions();
            setTransactions(result);
        })();
    }, []);

    return (
        <div>
            <h1>Statistics</h1>
            <StatsNavbarWrapper data={transactions}/>
        </div>
    )
}

export default Statistics
