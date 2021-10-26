import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./css/RegisterLogin.css";

// TODO: connect to backend
const LoginForm = () => {
  const [status, setStatus] = useState("Submit");

  const handleSubmit = async (e) => {
    setStatus("Sending");
  };

  return (
    <div>
      <br />
      <div class="container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <hr /> <br />
          <div class="form">
            <div>
              <label htmlFor="email">
                <b>Email:</b>
              </label>
              <input type="text" id="email" required />
            </div>
            <br />
            <div>
              <label htmlFor="password">
                <b>Password:</b>
              </label>
              <input type="text" id="password" required />
            </div>
          </div>
          <br />
          <Button
            type="submit"
            component={Link}
            to="/homepage"
            variant="contained"
          >
            Submit
          </Button>
        </form>
      </div>
      <br />
      <div class="container">
        <h3> Need an account? </h3>
        <Button
          type="submit"
          component={Link}
          to="/registration"
          variant="contained"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
