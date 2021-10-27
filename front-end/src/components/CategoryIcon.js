import React from "react";
import {
  FaUtensils,
  FaMoneyBillWave,
  FaShoppingCart,
  FaCarAlt,
  FaPlane,
  FaCocktail,
  FaLaughSquint,
} from "react-icons/fa";

const textToIcon = {
  food: FaUtensils,
  shopping: FaShoppingCart,
  automotive: FaCarAlt,
  travel: FaPlane,
  nightlife: FaCocktail,
  entertainment: FaLaughSquint,
};

export default function CategoryIcon({
  text,
  size = 64,
  color = "black",
  borderColor = "black",
}) {
  const Icon = textToIcon[text] ?? FaMoneyBillWave;

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
      <Icon color={color} size={~~(size * 0.6)} />
    </div>
  );
}
