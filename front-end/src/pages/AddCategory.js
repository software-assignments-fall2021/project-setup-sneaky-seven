import React from 'react'
import api from "../api";
import Button from '@mui/material/Button';
import { css, cx } from '@emotion/css';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';
import { globalStyles, iconNameToComponent } from '../utils';

// Please use CSS instead of importing a 'bespoke' component whose implementation
// is literally just CSS.
const styles = {
    iconButton: css`
    border-radius: 8px;
    margin: 3px;
    width: 50px;
    height: 50px;`,
    selectedIcon: css`
    border: solid black 4px;
    `,
    icon: css`
    width: 100%;
    height: 100%;`,
};

// DO NOT move these to another file. There's no reason to have 10 different files
// per screen. 'Best Practices' are only useful when they ACTUALLY HELP YOUR PROJECT
const IconGrid = ({ selectedIcon, setIcon }) => {
    return (
        <div className={cx(globalStyles.centerContent, globalStyles.flowDown)}>
            <b>Icons</b>

            <div className={cx(globalStyles.centerContent, globalStyles.wrapContent)}>
                {Object.entries(iconNameToComponent).map(([name, Icon]) => {
                    const selectedStyle = name === selectedIcon ? styles.selectedIcon : null;
                    return (
                        <button type={'button'} className={cx(styles.iconButton, selectedStyle)} onClick={() => setIcon(name)} >
                            <Icon id={name} className={styles.icon} />
                        </button>);
                })
                }
            </div>
        </div>
    );
};

const AddCategory = () => {
    const [icon, setIcon] = React.useState(undefined);
    const history = useHistory();

    const onSubmit = React.useCallback(async (evt) => {
        evt.preventDefault();
        const name = evt.target.name.value;

        await api.postNewCategory(name, icon);
        history.push("/categories");
    }, [history, icon]);

    return (
        <div>
            <h1>Add Category</h1>
            <form onSubmit={onSubmit} className="container">
                <label htmlFor="name" className={globalStyles.marginBottom}>Category Name:</label>
                <input type="text" id="name" name="name" required />
                <IconGrid selectedIcon={icon} setIcon={setIcon} />
                <button
                    type={'submit'}
                    className={globalStyles.muiButton}
                >
                    <AddIcon />
                    Add
                </button>
            </form>
        </div>
    )
};

export default AddCategory;
