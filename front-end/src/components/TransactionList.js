import React from "react";
import "./css/TransactionList.css";
import CategoryIcon from "./CategoryIcon";
import { useHistory } from "react-router";
import { DateTime } from "luxon";

const currenySymbol = {
  USD: "$",
};

export function Transaction({
  transaction_id,
  amount,
  merchant,
  category,
  account_name,
  date,
  currency,
}) {
  const formattedDate = DateTime.fromISO(date ?? 0).toFormat("DDDD");
  const amountColor = amount <= 0 ? "green" : "red";
  const symbol = currenySymbol[currency];

  let history = useHistory();
  function handleClick() {
    history.push("/transactions/" + transaction_id);
  }

  return (
    <article className="transaction" onClick={handleClick}>
      <div className="left">
        <CategoryIcon text={category} />
        <div className="text-details">
          <p className="bold">{merchant}</p>
          <p>{category[0]}</p>
          <p>{account_name}</p>
        </div>
      </div>

      <div className="right italics">
        <p className="bold" style={{ color: amountColor }}>
          {symbol} {amount * -1}
        </p>
        <p>{formattedDate}</p>
      </div>
    </article>
  );
}

export default function TransactionList({ data }) {
  return (
    <div>
      {(data ?? []).map((transaction) => (
        <Transaction key={transaction.transaction_id} {...transaction} />
      ))}
    </div>
  );
}
