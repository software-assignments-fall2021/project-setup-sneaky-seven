import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./css/RegisterLogin.css";

// TODO: connect to backend
const RegistrationForm = () => {
  const [status, setStatus] = useState("Submit");

  const handleSubmit = async (e) => {
    setStatus("Sending");
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
              <input type="text" id="email" required />
            </div>
            <br />
            <div>
              <label htmlFor="password">
                <b>Password:</b>
              </label>
              <input type="text" id="password" required />
            </div>
            <br />
          </div>
          <br />
          <Button type="submit" component={Link} to="/" variant="contained">
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
