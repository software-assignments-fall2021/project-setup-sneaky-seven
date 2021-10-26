import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./css/ContactForm.css";

// TODO: connect to backend
const ContactForm = () => {
  const [status, setStatus] = useState("Submit");

  const handleSubmit = async (e) => {
    setStatus("Sending");
  };

  return (
    <div>
      <br />
      <form onSubmit={handleSubmit} class="container">
        <div>
          <h1>Contact Us</h1>
        </div>
        <hr /> <br />
        <div class="form">
          <div>
            <label htmlFor="name">
              <b>Name:</b>
            </label>
            <br />

            <input type="text" id="name" required />
          </div>
          <br />
          <div>
            <label htmlFor="email">
              <b>Email:</b>
            </label>
            <br />

            <input type="email" id="email" required />
          </div>
          <br />
          <div>
            <label htmlFor="message">
              <b>Message:</b>
            </label>
            <br />
            <textarea id="message" required />
          </div>
        </div>
        <br />
        <Button type="submit" component={Link} to="/" variant="contained">
          {status}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
