import React from 'react'
import AccountPanel from '../components/Accounts/AccountPanel'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


// To-do: identify a good color scheme
function Accounts() {
    return (
        <div>
            <h1>Accounts</h1>
            {/* To-do: Once the backend is complete, dynamically map/render the banks instead of hard coding */}
            <AccountPanel bankName="1. Bank of America - Cash Rewards Mastercard" type="card"/>
            <AccountPanel bankName="2. Bank of America - Advantage Plus Banking" type="card"/>
            <AccountPanel bankName="3. Bank of America - Advantage Savings" type="card"/>
            <AccountPanel bankName="4. JP Morgan Chase - Student Checking Account" type="checking"/>
            <AccountPanel bankName="5. Discover it Student Cash Back" type="card"/>
            <AccountPanel bankName="6. Cash Account" type="cash"/>
            <Button variant="contained" startIcon ={<AddIcon />} buttonStyle={{ borderRadius: 25, spaceBetween: 0}}
      style={{ borderRadius: 25, marginTop: '1.5rem'}}>Add New Account</Button>
        </div>
    )
}

export default Accounts;