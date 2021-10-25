import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


// To-do: identify a good color scheme
function AccountDetailForm(props) {
    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
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