import React, { useState, useEffect } from "react";
import api from "../api";
import "./css/TransactionList.css";
import CategoryIcon from "./CategoryIcon";
import { useHistory } from "react-router";
import { DateTime } from "luxon";
import InfiniteScroll from "react-infinite-scroll-component";

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

export default function TransactionList() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  async function getMoreData() {
    console.log("getting more data");
    const res = await api.getAllTransactions(30, offset + 30);
    setOffset((offset) => offset + 30);
    setData((data) => data.concat(res));
  }
  useEffect(() => {
    (async () => {
      const result = await api.getAllTransactions(30);
      setData(result);
    })();
  }, []);
  return (
    <div>
      {(data ?? []).map((transaction) => (
        <Transaction key={transaction.transaction_id} {...transaction} />
      ))}
      <InfiniteScroll
        dataLength={data?.length}
        next={getMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      />
    </div>
  );
}
