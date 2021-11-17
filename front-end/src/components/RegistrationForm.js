import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./css/RegisterLogin.css";
import axios from "axios";

const RegistrationForm = () => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

  const handleSubmit = () => {
    console.log(email + " " + password);

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
        console.log(res.data);
        sessionStorage.setItem("user", JSON.stringify(res.data));
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
        <Button component={Link} to="/homepage" variant="contained">
          Connect with Google
        </Button>
        <br /> <br />
        <Button component={Link} to="/homepage" variant="contained">
          Connect with Facebook
        </Button>
        <br />
        <h2> OR </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <h3> Register Using Email</h3>
          </div>
          <div className="form">
            <div>
              <label htmlFor="email">
                <b> Email:</b>
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
            <br />
          </div>
          <br />
          <Button
            type="submit"
            component={Link}
            to="/"
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
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
