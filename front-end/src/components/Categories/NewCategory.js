import React from 'react'
import IconGrid from './IconGrid'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

function NewCategory() {
    return (
        <div>
            <form className="container">
            <label>
                <b>Category Name: </b>
                <input type="text" name="name" />
            </label>
            <br />
            <label>
                <b>Amount: </b>
                <input type="text" name="amount" />
            </label>
            <br /> 
            <IconGrid />
            <Button 
                style={{justifyContent: "flex-start", textAlign: 'left'}} 
                variant="contained"
                sx={{ fontWeight: 'bold', }}
                startIcon={<AddIcon />}
                size="large"
                href="/categories"
            >Add</Button>
            </form>
        </div>
    )
}

export default NewCategory
