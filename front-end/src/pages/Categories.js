import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import api from '../api';
import './css/Categories.css';
import { useHistory } from 'react-router-dom';
import { iconNameToComponent, useAsync, styles } from '../utils';

const Categories = () => {
    const { data: categoryData } = useAsync(api.getCategoryList, []);
    const categoryList = categoryData ?? [];
    const history = useHistory();
    const addCategory = React.useCallback(() => history.push("/categories/addCategory"), [history]);

    return (
        <div>
            <h1>Category</h1>
            <button
                type={'button'}
                className={styles.muiButton}
                onClick={addCategory}
            ><AddIcon />Add Category</button>
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
