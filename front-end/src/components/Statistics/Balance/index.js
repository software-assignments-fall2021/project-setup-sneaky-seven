import React from "react";
import axios from "axios";
import { useAsync } from "../../../utils";
import BarChart from "../Charts/BarChart";
import api from "../../../api/index";
import "../../css/balanceByAccount.css";

const Balance = ({ data }) => {
  const { accessToken } = api.useAccessToken();
  const { data: bankDataNullable } = useAsync(async () => {
    const resp = await axios.post("/api/get_bank_accounts", { access_token_object: accessToken });
    if (!resp.data.err) {
      return resp.data;
    }

    return undefined;
  }, []);

  const bankData = bankDataNullable ?? [];
  const base = bankData[0]?.balances?.available ?? 0;

  // Gather data
  const accountToBalance = {};
  const dateToBalance = {};

  data.forEach((transaction) => {
    const account = base + transaction.account;
    const date = transaction.date;
    const amount = base + transaction.amount;

    if (accountToBalance[account]) {
      accountToBalance[account] += amount;
    } else {
      accountToBalance[account] = amount;
    }

    if (dateToBalance[date]) {
      dateToBalance[date] += amount;
    } else {
      dateToBalance[date] = amount;
    }
  });

  // Reformat data
  const balanceTrend = [["Date", "Balance"]];

  for (const date in dateToBalance) {
    balanceTrend.push([date, dateToBalance[date]]);
  }

  return (
    <>
      <br />
      <div className="container-s">
        <h1>Balance</h1>
        <BarChart name="Balance Trend" data={balanceTrend} />
      </div>
    </>
  );
};

export default Balance;
