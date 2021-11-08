import React, { useState, useEffect } from "react";
import api from "../api";
import TransactionList from "../components/TransactionList";
import "./css/Transactions.css";
import axios from "axios";

function Transactions() {
  const [transactions, setTransactions] = useState();
  useEffect(() => {
    (async () => {
      const result = await api.getAllTransactions();
      setTransactions(result);
    })();
  }, []);

  return (
    <div>
      <h1>Transactions</h1>
      <TransactionList data={transactions} />
    </div>
  );
}

export default Transactions;
