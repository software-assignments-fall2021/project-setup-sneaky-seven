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
      <form onSubmit={handleSubmit} class="container">
        <div>
          <h1>Login</h1>
        </div>
        <hr /> <br />
        <div class="form">
          <label htmlFor="email">
            <b>Email:</b>
          </label>
          <input type="text" id="email" required />
        </div>
        <br />
        <div class="form">
          <label htmlFor="password">
            <b>Password:</b>
          </label>
          <input type="text" id="password" required />
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
