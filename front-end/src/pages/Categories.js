import React from "react";
import AddIcon from "@mui/icons-material/Add";
import api from "../api";
import "./css/Categories.css";
import { Transaction } from "../components/TransactionList";
import { Link, useHistory } from "react-router-dom";
import { iconNameToComponent, useAsync, styles } from "../utils";
import { AiOutlineClose } from "react-icons/ai";
import cx from "classnames";
import Button from "@mui/material/Button";

const CategoryOverlay = ({ category, closeOverlay }) => {
  const { data } = useAsync(api.getRecentTransactions, []);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    history.push({
      pathname: "/categories/editCategory",
      state: {
        name: category.name,
        icon: category.icon,
        transactions: transactions,
      },
    });
  };

  const transactions = React.useMemo(() => {
    if (category === null) {
      return [];
    }
    return data?.filter((t) => t.category.includes(category.name)) ?? [];
  }, [category, data]);

  if (category === null) {
    return null;
  }

  const Icon = iconNameToComponent[category.icon];
  // const [name, setName] = useState(category?.name);
  return (
    <div className={cx(styles.centerContent, "overlay-background")}>
      <div className="overlay-content">
        <button
          className={cx(styles.muiButton, "overlay-close")}
          onClick={closeOverlay}
        >
          <AiOutlineClose />
        </button>
        <h2>Category: {category.name}</h2>
        <Icon className="category-icon" />
        <br />
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          component={Link}
          to="/homepage"
        >
          {" "}
          Edit{" "}
        </Button>
        <h4>Transactions</h4>
        <div className="overlay-transactions-wrapper">
          <div className={cx("overlay-transactions")}>
            {transactions.map((t) => (
              <Transaction key={t.id} {...t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Categories = () => {
  const { data: categoryData, isLoaded } = useAsync(api.getCategoryList, []); // this is index.js
  const categoryList = categoryData ?? [];

  const history = useHistory();
  const addCategory = React.useCallback(
    () => history.push("/categories/addCategory"),
    [history]
  );
  const [current, setCurrent] = React.useState(null);
  const closeOverlay = React.useCallback(() => setCurrent(null), [setCurrent]);
  if (isLoaded) {
    return (
      <>
        <CategoryOverlay category={current} closeOverlay={closeOverlay} />
        <div className="categories-page">
          <h1>Category</h1>
          <button
            type={"button"}
            className={styles.muiButton}
            onClick={addCategory}
          >
            <AddIcon />
            Add Category
          </button>
          {categoryList.map((item, index) => {
            const Icon = iconNameToComponent[item.icon];
            return (
              <button
                key={item.name}
                className="category-item"
                onClick={() => setCurrent(item)}
              >
                <Icon />
                <span className={"category-text"}>{item.name}</span>
              </button>
            );
          })}
        </div>
      </>
    );
  }
  return null;
};

export default Categories;
