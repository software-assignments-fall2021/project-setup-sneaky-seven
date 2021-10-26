import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import api from "../api";
import { getTransactionById } from "../api/mocks";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useHistory } from "react-router";
import "./TransactionDetail.css";
import { DateTime } from "luxon";
import CategoryIcon from "../components/CategoryIcon";

const currenySymbol = {
  USD: "$",
};

export function TransactionDetail() {
  let { id } = useParams();
  const [transaction, setTransaction] = useState();
  useEffect(() => {
    (async () => {
      const result = await api.getTransactionById(Number(id));
      console.log(result);
      setTransaction(result);
    })();
  }, []);

  let history = useHistory();
  function handleBackClick() {
    history.goBack();
  }

  const amountColor = transaction?.amount >= 0 ? "green" : "red";
  const symbol = currenySymbol[transaction?.currency];
  const formattedDate = DateTime.fromISO(transaction?.date ?? 0).toFormat(
    "DDDD"
  );

  const [notes, setNotes] = useState("");
  const [checkedHide, setCheckedHide] = useState(false);
  const [checkedDuplicate, setCheckedDuplicate] = useState(false);

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
              <CategoryIcon text={category} />
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
