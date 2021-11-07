import React from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import api from '../api';
import './css/Categories.css';
import { useHistory } from 'react-router-dom';
import { iconNameToComponent, useAsync, globalStyles } from '../utils';

const Categories = () => {
    const { data: categoryData } = useAsync(api.getCategoryList, []);
    const categoryList = categoryData ?? [];
    const history = useHistory();
    const addCategory = React.useCallback(() => history.push("/categories/addCaetgory"), [history]);

    return (
        <div>
            <h1>Category</h1>
            <Button
                style={{justifyContent: "flex-start", textAlign: 'left'}}
                variant="contained"
                sx={{ fontWeight: 'bold', }}
                size="large"
                href="categories/addCategory"
            ><AddIcon />Add Category</Button>
            <ul>
                {categoryList.map((item, index) => {
                    const Icon = iconNameToComponent[item.icon];
                    return (
                        <li key={index} className={'category-item'}>
                            <Icon />
                            <span className={'category-text'} >{item.name}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default Categories
