import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";
import axios from "axios";
import { useAsync } from "../../utils";

const FAQ = () => {
  const { data } = useAsync(async () => axios.get("/faq"), []);

  const styles = {
    bgColor: "#dcf7fa",
    titleTextColor: "black",
    rowTitleColor: "black",
    rowContentColor: "grey",
  };

  const config = {
    animate: true,
  };
  const info = data?.data ?? {};
  console.log(info);
  return (
    <div className="container">
      <Faq data={info} styles={styles} config={config} />
    </div>
  );
};

export default FAQ;
