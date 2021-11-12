import React, { useEffect, useState } from "react";
import AccountPanel from "./AccountPanel";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "../css/AccountsPage.css";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";
import { useAsync } from '../../utils';

// TODO: replace all console.log with logger
const PlaidLink = ({ linkToken, setAccessToken }) => {
  const onSuccess = async (public_token, metadata) => {
    // send public_token to server to exchange for access_token
    console.log("enter onSuccess");
    console.log(public_token);
    const resp = await axios.post("/api/set_access_token", { public_token });
    console.log(resp.data);
    setAccessToken(resp.data.access_token);
  };

  const config = {
    token: linkToken,
    onSuccess,
    // onExit
    // onEvent
    env: "sandbox",
  };

  const { open, ready, error } = usePlaidLink(config);

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
  const [accessToken, _setAccessToken] = useState(localStorage.getItem("access_token_object"));
  const { data: bankDataNullable } = useAsync(async () => {
    if (accessToken === null) {
        return [];
    }

    const resp = await axios.post("/api/get_bank_accounts", { access_token_object: accessToken });
    if (!resp.data.err) {
      console.log(resp);
      console.log(resp.data);
      return resp.data;
    }

    return [];
  }, [accessToken]);
  const { data: linkToken } = useAsync(async () => {
    const result = await axios.post("/api/create_link_token", {});
    return result.data.link_token;
  }, []);
  const setAccessToken = React.useCallback((token) => {
    localStorage.setItem("access_token_object", token);
    _setAccessToken(token);
  }, [_setAccessToken]);
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
        <PlaidLink linkToken={linkToken} setAccessToken={setAccessToken} />
      )}
    </>
  );
}

export default AccountsPage;
