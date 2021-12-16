import "./css/Accounts.css";
import React, { useState } from "react";
import AccountDetail from "../components/AccountDetail/AccountDetail";
import AccountsPage from "../components/Accounts/AccountsPage";
import { useAsync } from "../utils";
import api from "../api";

// To-do: identify a better color scheme
// To-do 2: use the bankId in props when saving to DB
/**
 * This function handles the rendering of the list of accounts
 * When the user clicks on an account, it will render the details for that
 * particular account which is in the AccountDetail panel
 *
 * @returns Account page component
 */
function Accounts() {
  const { data: dataNullable } = useAsync(api.getAccountInfo, []);
  const data = dataNullable ?? [];
  const [showDetail, setShowDetail] = useState(false);
  const [bankDetails, setBankDetails] = useState("");

  const renderPage = showDetail ? (
    <AccountDetail
      showAccountDetail={setShowDetail}
      setBankDetailHeader={setBankDetails}
      bankDetails={bankDetails}
    />
  ) : (
    <AccountsPage
      banks={data}
      setShowDetail={setShowDetail}
      setBankDetails={setBankDetails}
    />
  );

  return <div className="container-account">{renderPage}</div>;
}

export default Accounts;
