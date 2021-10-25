import React, { useEffect, useState } from 'react';
import AccountPanel from './AccountPanel'
import AccountDetail from '../../pages/AccountDetail';
import { backupData } from './AccountBackupData';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

// props: 
    // 1. banks (list of banks)
    // 2. setShowDetail (function to pass as prop to AccountPanel)
    // 3. setBankDetailName (function to pass as prop to AccountPanel)
function AccountsPage(props) {

    data = props.banks

    // To-do: modularize this into Account component within this component so that when we reach return, its either showDetail or Account
    const actualAccountsPage = [<h1>Accounts</h1>]
    actualAccountsPage.push(
        data.map(bank => (
        <AccountPanel 
            bankName={bank.bankName} 
            type={bank.type}
            showAccountDetail={props.setShowDetail}
            setBankDetailHeader={props.setBankDetailName}
        />))
    )
    actualAccountsPage.push(
        <Button variant="contained" startIcon ={<AddIcon />} buttonStyle={{ borderRadius: 25, spaceBetween: 0}}
                style={{ borderRadius: 25, marginTop: '1.5rem'}}>
                Add New Account
        </Button>
    )

    return actualAccountsPage;
}

export default AccountsPage;