import React from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import api from '../api';
import { css } from '@emotion/css';
import { useHistory } from 'react-router-dom';
import { iconNameToComponent, useAsync, globalStyles } from '../utils';

// TODO(jennifer): Update px to percentage to fit in smaller screen
const styles = {
    categoryText: css`
    margin-left: 16px;`,
    categoryItem: css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
    height: 60px;
    font-size: xx-large;
    padding: 25px;
    border: 2px solid black;
    border-radius: 15px;
    width: auto;
    margin: 15px;
    margin-right: 50px;`,
};

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
                        <li key={index} className={styles.categoryItem}>
                            <Icon />
                            <span className={styles.categoryText} >{item.name}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default Categories
