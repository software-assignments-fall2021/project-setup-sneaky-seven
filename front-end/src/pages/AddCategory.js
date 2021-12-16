import React from "react";
import api from "../api";
import cx from "classnames";
import "./css/IconGrid.css";
import { useHistory } from "react-router-dom";
import { styles, iconNameToComponent } from "../utils";

//todo: move over with edit cats
const IconGrid = ({ selectedIcon, setIcon }) => {
  return (
    <div className={cx(styles.centerContent, styles.flowDown)}>
      <b>Icons</b>

      <div className={cx(styles.centerContent, styles.wrapContent)}>
        {Object.entries(iconNameToComponent).map(([name, Icon]) => {
          const selectedStyle = name === selectedIcon ? "selected-icon" : null;
          return (
            <button
              key={name}
              type={"button"}
              className={cx("icon-button", selectedStyle)}
              onClick={() => setIcon(name)}
            >
              <Icon id={name} className={styles.fillSpace} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

const AddCategory = () => {
  const [icon, setIcon] = React.useState("FaUtensils");
  const [alreadyAdded, setAlreadyAdded] = React.useState(false);
  const history = useHistory();

  const onSubmit = React.useCallback(
    async (evt) => {
      evt.preventDefault();
      const name = evt.target.name.value;
      const result = await api.postNewCategory(name, icon);
      if (result) {
        setAlreadyAdded(true);
      } else {
        history.push("/categories");
      }
    },
    [history, icon]
  );

  return (
    <div>
      <h1>Add Category</h1>
      {alreadyAdded ? <h2> Category already added!</h2> : null}
      <form onSubmit={onSubmit} className="container">
        <label htmlFor="name" className={styles.marginBottom}>
          <b> Category Name:</b>
        </label>
        <input type="text" id="name" name="name" required />
        <hr />
        <IconGrid selectedIcon={icon} setIcon={setIcon} />
        <button type={"submit"} className={styles.muiButton}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
