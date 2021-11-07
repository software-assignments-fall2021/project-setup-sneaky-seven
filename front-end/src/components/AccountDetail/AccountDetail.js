import React from "react";
import Button from "@mui/material/Button";
import AccountDetailForm from "./AccountDetailForm";
import "../css/AccountDetail.css";
/**
 * This component renders the body for the details page of 1 bank account.
 * Clicking on the "Save Details" button at the end will bring the user pack to the
 * Accounts page.
 * @param {*} props
 * @returns Details page for 1 bank account
 */
function AccountDetail(props) {
    console.log(props.bankDetails);
  return (
    <div>
      <h1>{props.bankDetails.name}</h1>
      <h5>Available Balance: {props.bankDetails.balances.available} {props.bankDetails.balances.currency}</h5>
      <h5>Current Balance: {props.bankDetails.balances.current} {props.bankDetails.balances.currency}</h5>
      <Button
        onClick={() => {
          props.showAccountDetail(false);
          props.setBankDetailHeader("");
        }}
        variant="contained"
        id="save-details-btn"
      >
        Back
      </Button>
    </div>
  );
}

export default AccountDetail;
