import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import api from "../api";
import { useAsync } from "../utils";
import { getTransactionById } from "../api/mocks";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useHistory } from "react-router";
import "./css/TransactionDetail.css";
import { DateTime } from "luxon";
import CategoryIcon from "../components/CategoryIcon";

const currenySymbol = {
  USD: "$",
};

export function TransactionDetail() {
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const history = useHistory();
  const [notes, setNotes] = useState("");
  const [checkedHide, setCheckedHide] = useState(false);
  const [checkedDuplicate, setCheckedDuplicate] = useState(false);

  const transaction = history.location.state;

  function handleBackClick() {
    history.goBack();
  }

  function handleCatClick(newCategory) {
    setSelectedCategory(newCategory);
  }

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
              "food",
              "shopping",
              "automotive",
              "travel",
              "nightlife",
              "entertainment",
            ].map((category) => (
              <span
                className="catIcon"
                onClick={() => handleCatClick(category)}
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
          <label>Notes</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="checkBoxes">
          <div>
            <label>Hide</label>
            <input
              type="checkbox"
              checked={checkedHide}
              onChange={(e) => setCheckedHide(e.target.checked)}
            />
            <div></div>
          </div>
          <div>
            <label>Mark Duplicate</label>
            <input
              type="checkbox"
              checked={checkedDuplicate}
              onChange={(e) => setCheckedDuplicate(e.target.checked)}
            />
            <div></div>
          </div>
        </div>
      </div>
    </article>
  );
}
