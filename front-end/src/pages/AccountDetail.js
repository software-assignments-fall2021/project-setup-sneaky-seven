import React from 'react'
import AccountPanel from '../components/Accounts/AccountPanel'
import Button from '@mui/material/Button';
import AccountDetailForm from '../components/AccountDetail/AccountDetailForm';


// To-do: identify a good color scheme
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