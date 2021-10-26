import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './css/AccountDetailForm.css'

/**
 * 
 * @param {*} props 
 * @returns Form component for editing account details
 */
function AccountDetailForm(props) {
    return (
        <div>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                id="form-detail"
            >
            <div>
                <TextField
                    required
                    id="standard-required"
                    label="Account Name"
                    variant="standard"
                />
                <TextField
                    required
                    id="standard-required"
                    label="Bank Account Number"
                    variant="standard"
                />
                <TextField
                    required
                    id="standard-required"
                    label="Account Type"
                    variant="standard"
                />
            </div>
            </Box>
        </div>
    )
}

export default AccountDetailForm;