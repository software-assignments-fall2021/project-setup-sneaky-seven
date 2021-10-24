import React, { useState } from 'react';
import '../css/Accounts.css'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


const AccountPanel = (props) => {

    const buttons = [
        <Button 
            // style={{minWidth: '140%'}}
        >
            {props.bankName}
        </Button>,
        // To-do: add bottom border colors for bottom 2 buttons. Currently there is misalignment
        // when I try and do anything other than this configuration of
        // colors border button variants
        // see screenshot: https://imgur.com/a/jKfKU5H
        <ButtonGroup size="large" variant="contained" color="info" aria-label="large text button group">
            <Button
                // style={{minWidth: '70%', maxHeight: '2.8em', minHeight: '2.8em'}}
                style={{maxWidth: '20em', maxHeight: '2.8em', minWidth: '20em', minHeight: '2.8em'}}
                variant="text"
                key="two"
            >
                Statistics
            </Button>
            <Button
                style={{maxWidth: '20em', maxHeight: '2.8em', minWidth: '20em', minHeight: '2.8em'}}
                // style={{minWidth: '70%', maxHeight: '2.8em', minHeight: '2.8em'}}
                variant="text"
                key="three"
            >
                Transactions
            </Button>
        </ButtonGroup>
      ];

    
    return (
        <div className="panel">
        <ButtonGroup
            size="large"
            orientation="vertical"
            aria-label="vertical contained button group"
        >
        {buttons}
        </ButtonGroup>
        </div>
      );
}

export default AccountPanel;