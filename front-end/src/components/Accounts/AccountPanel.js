import React, { useState } from 'react';
import '../css/Accounts.css'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SavingsIcon from '@mui/icons-material/Savings';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const styles = {
    // this group of buttons will be aligned to the right side
    toolbarButtons: {
      marginLeft: 'auto',
    },
  };

const AccountPanel = (props) => {
    const buttons = [
        <Button 
            style={{justifyContent: "flex-start", textAlign: 'left'}} 
            sx={{ fontWeight: 'bold', }} 
            startIcon={ props.type === 'card' ? <CreditCardIcon /> : <SavingsIcon />} 
            size="large"
            fullWidth={true}
            onClick={() => {props.showAccountDetail(true); props.setBankDetailHeader(props.bankName)}}
            >
            {props.bankName}
        </Button>
      ];

    return (
        <div className="panel">
        <ButtonGroup size="large" variant="outlined" aria-label="" fullWidth={true}>
            {buttons}
        </ButtonGroup>
        </div>
      );
}

export default AccountPanel;