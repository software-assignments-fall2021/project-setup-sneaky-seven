import React from "react";
import Button from "@mui/material/Button";
import "../css/AccountDetail.css";
import axios from "axios";

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
      <h5>
        Available Balance: {props.bankDetails.balances.available}{" "}
        {props.bankDetails.balances.currency}
      </h5>
      <h5>
        Current Balance: {props.bankDetails.balances.current}{" "}
        {props.bankDetails.balances.currency}
      </h5>
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
      <div>
        <Button
          onClick={() => {
            axios
              .post("/api/delete_account", {
                account_name: props.bankDetails.name,
                _id: JSON.parse(sessionStorage.getItem("user"))._id,
              })
              .then((resp) => {
                console.log(resp.data);
                alert("Account successfully removed.");
                window.location.reload();
                // props.showAccountDetail(false);
                // props.setBankDetailHeader("");
              });
          }}
          variant="contained"
          id="save-details-btn"
          color="secondary"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}

export default AccountDetail;
