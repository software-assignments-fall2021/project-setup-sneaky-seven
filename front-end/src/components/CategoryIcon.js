import React from "react";
import { iconNameToComponent } from "../utils";
import { FaMoneyBillWave } from "react-icons/fa";
// import { useAsync } from "../../utils";
// import { api } from "../../utils";

import {
  FaUtensils,
  FaShoppingCart,
  FaCarAlt,
  FaPlane,
  FaCocktail,
  FaLaughSquint,
} from "react-icons/fa";

const textToIcon = {
  Food: FaUtensils,
  Shops: FaShoppingCart,
  Automotive: FaCarAlt,
  Travel: FaPlane,
  Nightlife: FaCocktail,
  Entertainment: FaLaughSquint,
};

export default function CategoryIcon({
  icon,
  size = 64,
  color = "black",
  borderColor = "black",
}) {
  const Icon = iconNameToComponent[icon] ?? FaMoneyBillWave;
  return (
    <div
      style={{
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "4px solid " + borderColor,
      }}
    >
      <Icon color={color} size={~~(size * 0.8)} />
    </div>
  );
}
