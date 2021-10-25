import React from 'react'
import AccountPanel from '../Accounts/AccountPanel'
import Button from '@mui/material/Button';
import AccountDetailForm from './AccountDetailForm';

/**
 * This component renders the body for the details page of 1 bank account.
 * Clicking on the "Save Details" button at the end will bring the user pack to the 
 * Accounts page.
 * @param {*} props 
 * @returns Details page for 1 bank account
 */
function AccountDetail(props) {
    return (
        <div>
            <h1>{props.bankName}</h1>
            <AccountDetailForm />
            <Button 
                onClick={() => {props.showAccountDetail(false); props.setBankDetailHeader("")}} 
                variant="contained" 
                buttonStyle={{ borderRadius: 25, spaceBetween: 0}}
                style={{ borderRadius: 12, marginTop: '1.5rem'}}
            >
                Save Details
            </Button>
        </div>
    )
}

export default AccountDetail;