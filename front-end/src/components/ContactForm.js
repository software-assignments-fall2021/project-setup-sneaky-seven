import React, { useState } from "react";

// TODO: connect to backend 
const ContactForm = () => {
  const [status, setStatus] = useState("Submit")

  const handleSubmit = async (e) => {
    setStatus("Sending")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div><h1>Contact Us</h1></div>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" required />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" required />
      </div>
      <button type="submit">{status}</button>
    </form>
  );
};

export default ContactForm;