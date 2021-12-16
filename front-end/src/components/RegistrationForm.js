import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Button from "@mui/material/Button";
import "./css/RegisterLogin.css";
import axios from "axios";

const RegistrationForm = () => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [canLogin, updateCanLogin] = useState(false);

  const handleSubmit = () => {
    axios
      .post(
        "/api/register",
        { email, password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data));
        updateCanLogin(true);
        window.alert("Successful register. Please log in");
      })
      .catch((err) => {
        window.alert(err.response.data);
      });
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
        <h1> Sign Up </h1>
        <hr />
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form">
            <div>
              <label htmlFor="email">
                <b> Email:</b>
              </label>
              <input
                type="email"
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
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <br />
          </div>
          <br />
          <Button
            type="submit"
            component={Link}
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          {canLogin && <Redirect to="/" />}
        </form>
      </div>
      <br />
      <div className="container">
        <h3> Already have an account? </h3>
        <Button component={Link} to="/" variant="contained">
          Log in{" "}
        </Button>
      </div>
    </div>
  );
};

export default RegistrationForm;
