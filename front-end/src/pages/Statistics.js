import React, { useState, useEffect } from "react";
import api from "../api";
import StatsNavbarWrapper from "../components/Statistics/StatsNavbar/StatsNavbarWrapper";
import { useAsync } from "../utils";
import axios from "axios";

const Statistics = () => {
  const { data } = useAsync(async () => axios.get("/api/get_transactions"), []);
  const transactions = data?.data ?? [];

  return (
    <div>
      <h1>Statistics</h1>
      <StatsNavbarWrapper data={transactions} />
      <br />
    </div>
  );
};

export default Statistics;
