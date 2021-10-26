import React from "react";
import Accounts from "./Accounts.js";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "../components/css/Homepage.css";

const Homepage = () => {
  return (
    <div>
      <br />
      <div class="container-home">
        <Accounts> </Accounts>
        <Button
          variant="contained"
          id="new-account-btn"
          component={Link}
          to="/accounts"
        >
          See More
        </Button>
      </div>
    </div>
  );
};

export default Homepage;
