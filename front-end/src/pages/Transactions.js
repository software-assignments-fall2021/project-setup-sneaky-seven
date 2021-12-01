import React from "react";
import TransactionList from "../components/TransactionList";
import "./css/Transactions.css";

function Transactions() {
  return (
    <div>
      <h1>Transactions</h1>
      <TransactionList />
    </div>
  );
}

export default Transactions;
