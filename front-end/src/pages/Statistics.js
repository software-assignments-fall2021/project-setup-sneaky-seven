import React, { useState, useEffect } from "react";
import api from "../api";
import StatsNavbarWrapper from "../components/Statistics/StatsNavbar/StatsNavbarWrapper";
import { useAsync } from "../utils";

const Statistics = () => {
  const { data: transactionData } = useAsync(api.getAllTransactions, []);
  const transactions = transactionData ?? [];

  return (
    <div>
      <h1>Statistics</h1>
      <StatsNavbarWrapper data={transactions} />
    </div>
  );
};

export default Statistics;
