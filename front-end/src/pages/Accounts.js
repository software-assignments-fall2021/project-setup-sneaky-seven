import React, { useEffect, useState } from 'react';
import AccountList from '../components/Accounts/AccountList'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

// To-do: identify a good color scheme
function Accounts() {
    return (
        <>
            <AccountList />
        </>
    )
}

export default Accounts;