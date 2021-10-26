import React from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CategoryList from '../components/Categories/CategoryList';

const Categories = () => {
   
    return (
        <div>
            <h1>Category</h1>
            <Button 
                style={{justifyContent: "flex-start", textAlign: 'left'}} 
                variant="contained"
                sx={{ fontWeight: 'bold', }}
                startIcon={<AddIcon />}
                size="large"
                href="categories/addCategory"
            >Add Category</Button>
            <CategoryList />
        </div>
    )
}

export default Categories
