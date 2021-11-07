import React from 'react'
import api from "../api";
import cx from 'classnames';
import './css/IconGrid.css';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';
import { styles, iconNameToComponent } from '../utils';

const IconGrid = ({ selectedIcon, setIcon }) => {
    return (
        <div className={cx(styles.centerContent, styles.flowDown)}>
            <b>Icons</b>

            <div className={cx(styles.centerContent, styles.wrapContent)}>
                {Object.entries(iconNameToComponent).map(([name, Icon]) => {
                    const selectedStyle = name === selectedIcon ? 'selected-icon' : null;
                    return (
                        <button
                            type={'button'}
                            className={cx('icon-button', selectedStyle)}
                            onClick={() => setIcon(name)} >
                            <Icon id={name} className={styles.fillSpace} />
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
                <label htmlFor="name" className={styles.marginBottom}>Category Name:</label>
                <input type="text" id="name" name="name" required />
                <IconGrid selectedIcon={icon} setIcon={setIcon} />
                <button
                    type={'submit'}
                    className={styles.muiButton}
                >
                    <AddIcon />
                    Add
                </button>
            </form>
        </div>
    )
};

export default AddCategory;
