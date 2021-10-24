import React from 'react'
import AccountPanel from '../components/Accounts/AccountPanel'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

// To-do: identify a good color scheme
function Accounts() {
    return (
        <div>
            <h1>Accounts</h1>
            <Button variant="contained" startIcon={<AddIcon />}>Add Bank</Button>
            <AccountPanel bankName="Bank #1"/>
            <AccountPanel bankName="Bank #2"/>
            <AccountPanel bankName="Bank #3"/>
            <AccountPanel bankName="Bank #4"/>
            <AccountPanel bankName="Bank #5"/>
            <AccountPanel bankName="Bank #6"/>
        </div>
    )
}

export default Accounts
// front-end\src\components\Accounts