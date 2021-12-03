import React from "react";
import api from "../api";
import cx from "classnames";
import "./css/IconGrid.css";

import { useHistory } from "react-router-dom";
import { styles, iconNameToComponent } from "../utils";

const IconGrid = ({ selectedIcon, setIcon }) => {
  return (
    <div className={cx(styles.centerContent, styles.flowDown)}>
      <b>Icons</b>

      <div className={cx(styles.centerContent, styles.wrapContent)}>
        {Object.entries(iconNameToComponent).map(([name, Icon], index) => {
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

const EditCategory = (props) => {
  const oldName = props.history.location.state?.name || "";
  const oldIcon = props.history.location.state?.icon || undefined;
  const transactions = props.history.location.state?.transactions;

  const [icon, setIcon] = React.useState(oldIcon);
  const [name, setName] = React.useState(oldName);

  const [exists, setExists] = React.useState(true);
  const history = useHistory();

  const onSubmit = React.useCallback(
    async (evt) => {
      evt.preventDefault();
      const name = evt.target.name.value;
      const result = await api.editCategory(name, icon, oldName, oldIcon);

      if (result) {
        setExists(true);
        transactions?.forEach((transaction, i) => {
          api.setTransactionCategory(transaction.id, name);
        });
        history.push("/categories");
      } else {
        setExists(false);
      }
    },
    [history, name, icon, oldName, oldIcon, transactions]
  );

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  return (
    <div>
      <h1>Edit Category</h1>
      {!exists ? <h2> Category does not exist!</h2> : null}
      <form onSubmit={onSubmit} className="container">
        <label htmlFor="name" className={styles.marginBottom}>
          <b>Category Name:</b>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        <hr />
        <IconGrid selectedIcon={icon} setIcon={setIcon} />
        <button type={"submit"} className={styles.muiButton}>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
