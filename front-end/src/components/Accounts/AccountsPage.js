import React from "react";
import AccountPanel from "./AccountPanel";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "../css/AccountsPage.css";
import axios from "axios";
import api from "../../api";
import { usePlaidLink } from "react-plaid-link";
import { useAsync } from '../../utils';

// TODO: replace all console.log with logger
const PlaidLink = ({ linkToken, fetchAccessToken }) => {
  const config = {
    token: linkToken,
    onSuccess: fetchAccessToken,
    // onExit
    // onEvent
    env: "sandbox",
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <Button
      id="new-account-btn"
      onClick={() => open()}
      disabled={!ready}
      variant="contained"
      startIcon={<AddIcon />}
    >
      Connect a bank account
    </Button>
  );
};

/**
 * This component renders the full body of the webpage that shows each of the user's
 * accounts. It is comprised of 1 AccountPanel per account.
 * @param {*} props
 * @returns AccountsPage representing the full accounts page.
 *
 * props:
    1. banks (list of banks)
    2. setShowDetail (function to pass as prop to AccountPanel)
    3. setBankDetailName (function to pass as prop to AccountPanel)
 */
function AccountsPage(props) {
  const { accessToken, fetchToken } = api.useAccessToken();
  const { data: bankDataNullable } = useAsync(async () => {
    if (accessToken === null) {
        return [];
    }

    const resp = await axios.post("/api/get_bank_accounts", { access_token_object: accessToken });
    if (!resp.data.err) {
      return resp.data;
    }

    return [];
  }, [accessToken]);
  const { data: linkToken } = useAsync(async () => {
    const result = await axios.post("/api/create_link_token", {});
    return result.data.link_token;
  }, []);
  const bankData = bankDataNullable ?? [];

  return (
    <>
      <h1>Accounts</h1>
      {bankData.map((bank) => (
        <AccountPanel
          bankDetails={bank}
          type={bank.type}
          balances={bank.balances}
          showAccountDetail={props.setShowDetail}
          setBankDetails={props.setBankDetails}
        />
      ))}

      {linkToken === undefined ? (
        // insert your loading animation here
        <div></div>
      ) : (
        // Renders the button leading to Plaid bank adding
        <PlaidLink linkToken={linkToken} fetchAccessToken={fetchToken} />
      )}
    </>
  );
}

export default AccountsPage;
