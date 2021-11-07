import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "../../pages/Login";
import Registration from "../../pages/Registration";
import Homepage from "../../pages/Homepage";
import Accounts from "../../pages/Accounts";
import Transactions from "../../pages/Transactions";
import Statistics from "../../pages/Statistics";
import Categories from "../../pages/Categories";
import AddCategory from "../../pages/AddCategory";
import Contact from "../../pages/Contact";
import FAQs from "../../pages/FAQs";
import { TransactionDetail } from "../../pages/TransactionDetail";

const NavbarWrapper = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/registration" exact component={Registration} />
        <Route path="/homepage" exact component={Homepage} />
        <Route path="/accounts" exact component={Accounts} />
        <Route path="/transactions" exact component={Transactions} />
        <Route path="/transactions/:id" exact component={TransactionDetail} />

        {/* this has children routes, which can't be matched if this route is exact. */}
        <Route path="/statistics" component={Statistics} />
        <Route path="/categories" exact component={Categories} />
        <Route path="/categories/addCategory" exact component={AddCategory} />
        <Route path="/FAQs" exact component={FAQs} />
        <Route path="/contact" exact component={Contact} />
      </Switch>
    </Router>
  );
};

export default NavbarWrapper;
