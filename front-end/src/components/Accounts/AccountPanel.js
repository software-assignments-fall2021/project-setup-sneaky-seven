import React from "react";
import "../css/AccountPanel.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SavingsIcon from "@mui/icons-material/Savings";

/**
 * This component represents 1 bank account panel. Clicking on this component will
 * bring the user to the details page for it.
 * @param {*} props
 * @returns AccountPanel component representing 1 bank/card account
 * props:
    1. banks (list of banks)
    2. setShowDetail (function to pass as prop to AccountPanel)
    3. setBankDetailName (function to pass as prop to AccountPanel)
 */
const AccountPanel = (props) => {
  return (
    <div className="panel">
      <ButtonGroup
        size="large"
        variant="outlined"
        aria-label=""
        fullWidth={true}
      >
        <Button
          id="account-panel"
          startIcon={
            props.type === "card" ? <CreditCardIcon /> : <SavingsIcon />
          }
          size="large"
          fullWidth={true}
          onClick={() => {
            props.showAccountDetail(true);
            props.setBankDetails(props.bankDetails);
          }}
        >
          {props.bankDetails.name}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default AccountPanel;
