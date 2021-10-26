import React, { PureComponent } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "../../pages/Login";
import Registration from "../../pages/Registration";
import Homepage from "../../pages/Homepage";
import Accounts from "../../pages/Accounts";
import Transactions from "../../pages/Transactions";
import Statistics from "../../pages/Statistics";
import Contact from "../../pages/Contact";
import FAQs from "../../pages/FAQs";

export class NavbarWrapper extends PureComponent {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/registration" exact component={Registration} />
          <Route path="/homepage" exact component={Homepage} />
          <Route path="/accounts" exact component={Accounts} />
          <Route path="/transactions" exact component={Transactions} />
          <Route path="/statistics" exact component={Statistics} />
          <Route path="/FAQs" exact component={FAQs} />
          <Route path="/contact" exact component={Contact} />
        </Switch>
      </Router>
    );
  }
}

export default NavbarWrapper;
