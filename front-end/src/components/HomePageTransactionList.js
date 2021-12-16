import React, { useState, useEffect } from "react";
import api from "../api";
import "./css/TransactionList.css";
import { Transaction } from "./TransactionList";

export default function HomePageTransactionList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await api.getRecentTransactions(10);
      setData(result);
    })();
  }, []);
  return (
    <div>
      {(data ?? []).map((transaction) => (
        <Transaction key={transaction.transaction_id} {...transaction} />
      ))}
    </div>
  );
}
