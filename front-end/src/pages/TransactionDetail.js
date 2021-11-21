import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import api from "../api";
import { useAsync } from "../utils";

import { IoIosArrowRoundBack } from "react-icons/io";
import { useHistory } from "react-router";
import "./css/TransactionDetail.css";
import { DateTime } from "luxon";
import CategoryIcon from "../components/CategoryIcon";

const currenySymbol = {
  USD: "$",
};

export function TransactionDetail() {
  const history = useHistory();

  const [checkedHide, setCheckedHide] = useState(false);
  const [checkedDuplicate, setCheckedDuplicate] = useState(false);
  const transaction = history.location.state;
  if (!transaction) {
    history.goBack();
  }
  const [notes, setNotes] = useState(transaction.notes);
  const [selectedCategory, setSelectedCategory] = useState(
    transaction.category
  );
  function handleBackClick() {
    history.goBack();
  }

  function handleCatClick(id, newCategory) {
    setSelectedCategory(newCategory);
    api.setTransactionCategory(id, newCategory);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    api.setTransactionNotes(
      transaction.transaction_id,
      transaction.category,
      notes
    );
  };
  const amountColor = transaction?.amount >= 0 ? "green" : "red";
  const symbol = currenySymbol[transaction?.currency];

  const formattedDate = transaction?.date
    ? DateTime.fromISO(transaction?.date).toFormat("DDDD")
    : "";

  return (
    <article className="transactionView">
      <div className="subheader">
        <div className="transBackButton" onClick={handleBackClick}>
          <IoIosArrowRoundBack size={50} />
        </div>
        <h3 className="transactionAmount" style={{ color: amountColor }}>
          {symbol} {transaction?.amount}
        </h3>
        <div style={{ width: "50px", height: "50px" }}></div>
      </div>
      <div className="transDetails">
        <div>
          <label>Merchant</label>
          <p>{transaction?.merchant}</p>
        </div>
        <div>
          <label>Date</label>
          <p>{formattedDate}</p>
        </div>
        <div>
          <label>Category</label>
          <div className="categoryIcons">
            {[
              "Food",
              "Shops",
              "Automotive",
              "Travel",
              "Nightlife",
              "Entertainment",
            ].map((category) => (
              <span
                className="catIcon"
                onClick={() =>
                  handleCatClick(transaction.transaction_id, category)
                }
              >
                <CategoryIcon
                  text={category}
                  size={50}
                  color={
                    selectedCategory === category
                      ? "rgba(0, 4, 255, 0.733)"
                      : "grey"
                  }
                  borderColor={
                    selectedCategory === category
                      ? "rgba(0, 4, 255, 0.733)"
                      : "grey"
                  }
                />
              </span>
            ))}
          </div>
        </div>
        <div>
          <label>Currency</label>
          <p>{transaction?.currency}</p>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <label>Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </article>
  );
}
