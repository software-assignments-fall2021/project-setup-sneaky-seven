import React, { useState } from 'react';
import '../css/Accounts.css'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


const AccountPanel = (props) => {
    const buttons = [
        <Button >{props.bankName}</Button>,
        <ButtonGroup size="medium" variant="contained" color="primary" aria-label="large text button group">
            <Button variant="contained" key="two" href="statistics">
                Statistics
            </Button>
            <Button variant="contained" key="three" href="transactions">
                Transactions
            </Button>
        </ButtonGroup>
      ];

    return (
        <div className="panel">
        <ButtonGroup size="large" orientation="vertical" aria-label="vertical contained button group" fullWidth={true}>
            {buttons}
        </ButtonGroup>
        </div>
      );
}

export default AccountPanel;