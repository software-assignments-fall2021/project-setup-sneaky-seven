import React, { useState, useEffect } from "react";
import api from "../api";
import TransactionList from "../components/TransactionList";
import "./css/Transactions.css";
import axios from "axios";

function Transactions() {
  return (
    <div>
      <h1>Transactions</h1>
      <TransactionList />
    </div>
  );
}

export default Transactions;
