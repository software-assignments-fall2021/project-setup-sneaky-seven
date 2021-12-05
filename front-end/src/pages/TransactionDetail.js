import React, { useState } from "react";
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

const Field = ({ title, text, children }) => {
  return (
    <div className="transactionField">
      <label className="transactionFieldLabel">{title}</label>
      {children ?? <p className="transactionFieldText">{text}</p>}
    </div>
  );
};

export function TransactionDetail() {
  const { data: categoryData } = useAsync(api.getCategoryList, []);
  const categoryList = categoryData ?? [];

  const history = useHistory();

  const transaction = history.location.state;
  if (!transaction) {
    history.goBack();
  }
  const [notes, setNotes] = useState(transaction?.notes);
  const [selectedCategory, setSelectedCategory] = useState(
    transaction?.category
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
  const amountColor = transaction?.amount <= 0 ? "green" : "red";

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
          {symbol} {transaction?.amount * -1}
        </h3>
        <div style={{ width: "50px", height: "50px" }}></div>
      </div>
      <div className="transDetails">
        <Field title={"Merchant"} text={transaction?.merchant ?? "None"} />
        <Field title={"Date"} text={formattedDate} />
        <Field title={"Category"}>
          <div className="categoryIconsWrapper">
            <div className="categoryIcons">
              {categoryList.map((category) => (
                <div
                  className="catIcon"
                  title={category.name}
                  onClick={() => {
                    handleCatClick(transaction.transaction_id, category.name);
                  }}
                >
                  <CategoryIcon
                    icon={category.icon}
                    size={7}
                    color={
                      selectedCategory === category.name
                        ? "rgba(0, 4, 255, 0.733)"
                        : "grey"
                    }
                    borderColor={
                      selectedCategory === category.name
                        ? "rgba(0, 4, 255, 0.733)"
                        : "grey"
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </Field>
        <Field title={"Currency"} text={transaction?.currency} />
        <Field title={"Notes"}>
          {" "}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <input type="submit" value="Submit" />
          </form>
        </Field>
      </div>
    </article>
  );
}
