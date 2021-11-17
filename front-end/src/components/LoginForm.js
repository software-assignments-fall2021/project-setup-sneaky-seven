import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./css/RegisterLogin.css";
import axios from "axios";

const LoginForm = () => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [canLogin, updateCanLogin] = useState(false); 

  const handleSubmit = () => {
    console.log(email + " " + password);

    axios
      .post(
        "/api/login",
        { email, password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("user", JSON.stringify(res.data));
        updateCanLogin(true); // TODO: fix the problem that the page will redirect to homepage when click twice
      })
      .catch((err) => {
        window.alert(err.response.data);
      })
  };

  const handleEmailChange = (event) => {
    event.preventDefault();
    updateEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    updatePassword(event.target.value);
  };

  return (
    <div>
      <br />
      <div className="container">
        <form>
          <h1>Login</h1>
          <hr /> <br />
          <div className="form">
            <div>
              <label htmlFor="email">
                <b>Email:</b>
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <br />
            <div>
              <label htmlFor="password">
                <b>Password:</b>
              </label>
              <input
                type="text"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
          </div>
          <br />
          <Button
            type="submit"
            component={Link}
            to={canLogin ? "/homepage": "/"}
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </div>
      <br />
      <div className="container">
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
