import React from "react";
import { useHistory } from "react-router-dom";
import IconGrid from "./IconGrid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const NewCategory = () => {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    if (e.target.name.value == "") {
    }
    const categories = { hierarchy: [e.target.name.value] };
    axios
      .post("/api/categories", {
        hierarchy: [e.target.name.value],
      })
      .then((resp) => {
        console.log(resp.data);
      });
    history.push("/categories");
  };

  return (
    <div>
      <form className="container" onSubmit={handleSubmit}>
        <label>
          <b>Category Name: </b>
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          <b>Amount: </b>
          <input type="text" name="amount" />
        </label>
        <br />
        <IconGrid />
        <Button
          style={{ justifyContent: "flex-start", textAlign: "left" }}
          variant="contained"
          sx={{ fontWeight: "bold" }}
          startIcon={<AddIcon />}
          size="large"
          type="submit"
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default NewCategory;
