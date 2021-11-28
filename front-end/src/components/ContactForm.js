import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import "./css/ContactForm.css";
import axios from "axios";

// TODO: connect to backend
const ContactForm = () => {
  const [status, setStatus] = useState("Submit");
  const history = useHistory();
  const handleSubmit = async (e) => {
    setStatus("Sending");
    const contactInfo = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };
    axios.post("/contactInfo", contactInfo);

    history.push("/contactConfirm");
  };

  return (
    <div>
      <br />
      <form onSubmit={handleSubmit} className="container-contact">
        <div>
          <h1>Contact Us</h1>
        </div>
        <hr /> <br />
        <div>
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
        <Button type="submit" variant="contained">
          {status}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
