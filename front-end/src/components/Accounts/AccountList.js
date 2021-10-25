import React, { useEffect, useState } from 'react';
import AccountPanel from './AccountPanel'
import AccountDetail from '../../pages/AccountDetail';
import { backupData } from './AccountBackupData';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

// To-do: turn this into the actual accounts main page
/**
 * This function handles the rendering of the list of accounts
 * When the user clicks on an account, it will render the details for that
 * particular account which is in the AccountDetail panel.
 * 
 * @returns Account page component
 */
function AccountList() {

    const [data, setData] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [bankDetailName, setBankDetailName] = useState("")

    useEffect(() => {
        console.log("fetching accounts data for user");
        axios('https://my.api.mockaroo.com/budget_app_accounts.json?key=9a5445a0')
            .then((response) => {
                setData(response.data)
            })
            .catch((err) => {
                console.log("Something went wrong. We're probably out of requests for the day!")
                console.error(err);
                setData(backupData)
            })
    })


    // To-do: modularize this into Account component within this component so that when we reach return, its either showDetail or Account
    const actualAccountsPage = [<h1>Accounts</h1>]
    actualAccountsPage.push(
        data.map(bank => (
        <AccountPanel 
            bankName={bank.bankName} 
            type={bank.type}
            showAccountDetail={setShowDetail}
            setBankDetailHeader={setBankDetailName}
        />))
    )
    actualAccountsPage.push(
        <Button variant="contained" startIcon ={<AddIcon />} buttonStyle={{ borderRadius: 25, spaceBetween: 0}}
                style={{ borderRadius: 25, marginTop: '1.5rem'}}>
                Add New Account
        </Button>
    )

    return showDetail ? 
        <AccountDetail 
            showAccountDetail={setShowDetail}
            setBankDetailHeader={setBankDetailName} 
            bankName={bankDetailName}
            /> : 
        actualAccountsPage
}

export default AccountList;