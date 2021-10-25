import React, { useEffect, useState } from 'react';
import AccountPanel from './AccountPanel'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

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
    const data = props.banks

    return (
        <>
        <h1>Accounts</h1>

        {data.map(bank => (
            <AccountPanel 
                bankName={bank.bankName} 
                type={bank.type}
                showAccountDetail={props.setShowDetail}
                setBankDetailHeader={props.setBankDetailName}
            />))}

        <Button variant="contained" startIcon ={<AddIcon />} buttonStyle={{ borderRadius: 25, spaceBetween: 0}}
            style={{ borderRadius: 25, marginTop: '1.5rem'}}>
            Add New Account
        </Button>
        </>
    )
}

export default AccountsPage;