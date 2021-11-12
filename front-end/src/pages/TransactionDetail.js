import React from "react";
import { useParams } from "react-router";
import api from "../api";
import { useAsync } from "../utils";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useHistory } from "react-router";
import "./css/TransactionDetail.css";
import { DateTime } from "luxon";
import CategoryIcon from "../components/CategoryIcon";

const Field = ({ title, text, children }) => {
  return (
    <div className="transactionField">
      <label className="transactionFieldLabel">{title}</label>
      {children ??  <p className="transactionFieldText">{text}</p>}
    </div>
  );
};

export function TransactionDetail() {
  let { id } = useParams();
  const { data: categoryData } = useAsync(api.getCategoryList, []);
  const categoryList = categoryData ?? [];
  const [selectedCategory, setSelectedCategory] = React.useState(undefined);
  const history = useHistory();
  const [notes, setNotes] = React.useState("");
  const [checkedHide, setCheckedHide] = React.useState(false);
  const [checkedDuplicate, setCheckedDuplicate] = React.useState(false);

  //retreive transaction
  const { data: transaction } = useAsync(async () => {
    const result = await api.getTransactionById(id);
    setSelectedCategory(result?.category);
    return result;
  }, [id, setSelectedCategory]);

  const amountColor = transaction?.amount >= 0 ? "green" : "red";

  const formattedDate = transaction?.date
    ? DateTime.fromISO(transaction?.date).toFormat("DDDD")
    : "";

  return (
    <article className="transactionView">
      <div className="subheader">
        <div className="transBackButton" onClick={() => history.goBack()}>
          <IoIosArrowRoundBack size={50} />
        </div>
        <h3 className="transactionAmount" style={{ color: amountColor }}>
          {"$"}{transaction?.amount}
        </h3>
        <div style={{ width: "50px", height: "50px" }}></div>
      </div>
      <div className="transDetails">
        <Field title={"Merchant"} text={transaction?.merchant ?? "None"}  />
        <Field title={"Date"} text={formattedDate}  />
        <Field title={"Category"}>
          <div className="categoryIconsWrapper">
            <div className="categoryIcons">
              {categoryList.map((category) => (
                <div
                  className="catIcon"
                  title={category.name}
                  onClick={() => setSelectedCategory(category)}
                >
                  <CategoryIcon
                    icon={category.icon}
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
                </div>
              ))}
            </div>
          </div>
        </Field>
        <Field title={"Currency"} text={transaction?.currency} />
        <Field title={"Notes"} >
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Field>
        <Field title={"Settings"}>
          <div className="checkBoxes">
            <div>
              <input
                type="checkbox"
                checked={checkedHide}
                onChange={(e) => setCheckedHide(e.target.checked)}
              />
              <label>Hide</label>
            </div>
            <div>
              <input
                type="checkbox"
                checked={checkedDuplicate}
                onChange={(e) => setCheckedDuplicate(e.target.checked)}
              />
              <label>Mark Duplicate</label>
            </div>
          </div>
        </Field>
      </div>
    </article>
  );
}
