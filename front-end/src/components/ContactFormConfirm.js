import React from "react";
import "./css/ContactForm.css";
import axios from "axios";
import { useAsync } from "../utils";

const ContactFormConfirm = () => {
  const { data } = useAsync(async () => axios.get("/contactInfo"), []);
  const name = data?.data?.name ?? "";
  const email = data?.data?.email ?? "";
  console.log("body:");
  console.log(data);
  let msg = "";
  if (name === "") {
    msg = "Please submit a Contact Us request first!";
  } else {
    msg =
      "Thanks " +
      name +
      "! We will do our best to send a response to " +
      email +
      " in a timely manner.";
  }
  return (
    <div>
      <br />
      <div className="container-confirm">
        <h1>{msg}</h1>
      </div>
    </div>
  );
};

export default ContactFormConfirm;
